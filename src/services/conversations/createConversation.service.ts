import { prisma } from "../../app"
import {
  IConversation,
  IConversationReturn,
} from "../../interfaces/conversation.interfaces"
import { ConversationReturn } from "../../schemas/conversations.schema"

const createConversationService = async (
  payload: IConversation
): Promise<IConversationReturn> => {
  const conversation = await prisma.conversation.create({
    data: payload,
  })

  return ConversationReturn.parse(conversation)
}

export default createConversationService
