import { z } from "zod"

const Auth = z.object({
  username: z.string(),
  password: z.string(),
})

export { Auth }
