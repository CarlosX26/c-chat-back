import { Socket } from "socket.io"
import { prisma } from "./app"
import AppError from "./error"

const socketEvents = async (socket: Socket) => {
  console.log("Tentativa de conexão!")
  console.log("socket.data => " + socket.data.userAuthId)

  // Create a new conversation (private or group)
  socket.on(
    "create_conversation",
    async ({ participantIds, isGroup = false, name }) => {
      try {
        const userId = socket.data.userAuthId

        // For private conversations, check if one already exists
        if (!isGroup && participantIds.length === 1) {
          const existingConversation = await prisma.conversation.findFirst({
            where: {
              isGroup: false,
              users: {
                every: {
                  userId: { in: [userId, participantIds[0]] },
                },
              },
            },
            include: { users: true },
          })

          if (existingConversation && existingConversation.users.length === 2) {
            socket.emit("conversation_created", {
              conversationId: existingConversation.id,
            })
            return
          }
        }

        // Create new conversation
        const conversation = await prisma.conversation.create({
          data: {
            isGroup,
            name: isGroup ? name : null,
            users: {
              create: [
                { userId },
                ...participantIds.map((id: string) => ({ userId: id })),
              ],
            },
          },
        })

        socket.emit("conversation_created", { conversationId: conversation.id })
        console.log(`Conversa criada: ${conversation.id} por ${userId}`)
      } catch (error) {
        console.log("🚀 ~ create_conversation ~ error:", error)
        socket.emit("error", { message: "Failed to create conversation" })
      }
    }
  )

  // Join an existing conversation
  socket.on("join_conversation", async ({ conversationId }) => {
    try {
      const userId = socket.data.userAuthId

      // Check if user is part of this conversation
      const userConversation = await prisma.userConversation.findFirst({
        where: {
          userId,
          conversationId,
        },
        include: {
          conversation: true,
        },
      })

      if (!userConversation) {
        throw new AppError("You are not part of this conversation")
      }

      socket.join(conversationId)

      // Load recent messages
      const messages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "desc" },
        take: 50,
      })

      socket.emit("conversation_joined", {
        conversationId,
        messages: messages.reverse(),
      })

      console.log(`Usuário ${userId} entrou na conversa: ${conversationId}`)
    } catch (error) {
      console.log("🚀 ~ join_conversation ~ error:", error)
      if (error instanceof AppError) {
        socket.emit("error", { message: error.message })
      } else {
        socket.emit("error", { message: "Failed to join conversation" })
      }
    }
  })

  // Send message and persist to database
  socket.on("send_message", async ({ conversationId, content }) => {
    try {
      const senderId = socket.data.userAuthId

      // Verify user is part of conversation
      const userConversation = await prisma.userConversation.findFirst({
        where: {
          userId: senderId,
          conversationId,
        },
      })

      if (!userConversation) {
        throw new AppError("You are not part of this conversation")
      }

      // Save message to database
      const message = await prisma.message.create({
        data: {
          content,
          senderId,
          conversationId,
        },
      })

      // Emit to all users in the conversation
      socket.to(conversationId).emit("receive_message", {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        conversationId: message.conversationId,
        createdAt: message.createdAt,
      })

      // Confirm message sent to sender
      socket.emit("message_sent", {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        conversationId: message.conversationId,
        createdAt: message.createdAt,
      })
    } catch (error) {
      console.log("🚀 ~ send_message ~ error:", error)
      if (error instanceof AppError) {
        socket.emit("error", { message: error.message })
      } else {
        socket.emit("error", { message: "Failed to send message" })
      }
    }
  })

  // Get user's conversations
  socket.on("get_conversations", async () => {
    try {
      const userId = socket.data.userAuthId

      const conversations = await prisma.userConversation.findMany({
        where: { userId },
        include: {
          conversation: {
            include: {
              users: {
                include: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      avatar: true,
                    },
                  },
                },
              },
              messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
              },
            },
          },
        },
      })

      socket.emit(
        "conversations_list",
        conversations.map((uc) => uc.conversation)
      )
    } catch (error) {
      console.log("🚀 ~ get_conversations ~ error:", error)
      socket.emit("error", { message: "Failed to get conversations" })
    }
  })

  socket.on("connect_error", (error) => {
    console.error("Erro de conexão:", error)
  })

  socket.on("error", (reason) => {
    console.log("🚀 ~ socket.on ~ reason:", reason)
  })

  socket.on("disconnect", (reason) => {
    console.log("🚀 ~ socket.on ~ reason:", reason)
  })
}

export default socketEvents
