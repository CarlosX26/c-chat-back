import { Socket } from "socket.io"
import { prisma } from "./app"
import AppError from "./error"

const socketEvents = async (socket: Socket) => {
  console.log("Tentativa de conexão!")
  console.log("socket.data => " + socket.data.userAuthId)

  socket.on("join_conversation", async ({ roomId }) => {
    try {
      const room = await prisma.conversation.findUnique({
        where: {
          id: roomId,
        },
      })

      if (!room) {
        throw new AppError("Room not found.")
      }

      socket.join(room.id)

      console.log(`Usuário conectado: ${socket.data.userAuthId} - ${room.name}`)
    } catch (error) {
      socket.emit("error", { message: error })
    }
  })

  socket.on("send_message", ({ roomId, data }) => {
    const senderId = socket.data.userAuthId

    socket
      .to(roomId)
      .emit("receive_message", JSON.stringify({ senderId, data }))
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
