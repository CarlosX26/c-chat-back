import { z } from "zod"

const User = z.object({
  username: z.string().max(128).min(5).toLowerCase(),
  avatar: z.string().optional(),
  password: z.string().min(8),
})

const UserUpdate = User.partial()

const UserReturn = User.extend({
  id: z.string(),
  avatar: z.string().or(z.null()),
  createdAt: z.date(),
}).omit({
  password: true,
})

const AllUsersReturn = z.array(UserReturn)

export { User, UserUpdate, UserReturn, AllUsersReturn }
