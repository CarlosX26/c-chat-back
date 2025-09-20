import { prisma } from "../../app"
import { IUserReturn } from "../../interfaces/users.interfaces"
import { UserReturn } from "../../schemas/users.schema"

const readUserService = async (userAuthId: string): Promise<IUserReturn> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userAuthId,
    },
  })

  return UserReturn.parse(user)
}

export default readUserService
