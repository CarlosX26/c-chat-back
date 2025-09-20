import { prisma } from "../../app"

const readConversationService = async (
  conversationId: string,
  userAuthId: string
  //TODO: typing promise
): Promise<any> => {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
      users: {
        some: {
          id: userAuthId,
        },
      },
    },
    select: {
      messages: true,
    },
  })

  return conversation
}

export default readConversationService
