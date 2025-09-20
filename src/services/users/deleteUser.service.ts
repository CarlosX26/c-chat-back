import { prisma } from "../../app"

const deleteUserService = async (userAuthId: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id: userAuthId,
    },
  })
}

export default deleteUserService
