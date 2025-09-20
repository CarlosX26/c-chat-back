import { z } from "zod"
import {
  Conversation,
  ConversationReturn,
} from "../schemas/conversations.schema"

type IConversation = z.infer<typeof Conversation>
type IConversationReturn = z.infer<typeof ConversationReturn>

export { IConversation, IConversationReturn }
