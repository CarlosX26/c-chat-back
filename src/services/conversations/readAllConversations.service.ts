import { prisma } from "../../app"

const readAllConversationService = async (
  userAuthId: string
  //TODO: typing promise
): Promise<any> => {
  const conversation = await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          id: userAuthId,
        },
      },
    },
  })

  return conversation
}

export default readAllConversationService
