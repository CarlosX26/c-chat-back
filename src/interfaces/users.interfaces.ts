import { z } from "zod"
import {
  AllUsersReturn,
  User,
  UserReturn,
  UserUpdate,
} from "../schemas/users.schema"

type IUser = z.infer<typeof User>

type IUserUpdate = z.infer<typeof UserUpdate>

type IUserReturn = z.infer<typeof UserReturn>

type IAllUserReturn = z.infer<typeof AllUsersReturn>

export { IUser, IUserUpdate, IUserReturn, IAllUserReturn }
