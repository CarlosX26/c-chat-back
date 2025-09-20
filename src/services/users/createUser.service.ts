import { prisma } from "../../app"
import { IUser, IUserReturn } from "../../interfaces/users.interfaces"
import { UserReturn } from "../../schemas/users.schema"
import { hashSync } from "bcryptjs"

const createUserService = async (payload: IUser): Promise<IUserReturn> => {
  const password = payload.password

  const hashPassword = hashSync(password, 12)

  const newUser = await prisma.user.create({
    data: {
      ...payload,
      avatar: null,
      password: hashPassword,
    },
  })

  return UserReturn.parse(newUser)
}

export default createUserService
