import { z } from "zod"

const Conversation = z.object({
  name: z.string(),
})

const ConversationReturn = z.object({
  id: z.string(),
  isGroup: z.boolean(),
  createdAt: z.string(),
  name: z.string(),
})

export { Conversation, ConversationReturn }
