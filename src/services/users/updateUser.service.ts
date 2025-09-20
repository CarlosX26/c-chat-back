import { prisma } from "../../app"
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces"
import { UserReturn } from "../../schemas/users.schema"

const updateUserService = async (
  userAuthId: string,
  payload: IUserUpdate
): Promise<IUserReturn> => {
  const user = await prisma.user.update({
    where: {
      id: userAuthId,
    },
    data: { ...payload },
  })

  return UserReturn.parse(user)
}

export default updateUserService
