import { IAllUserReturn } from "../../interfaces/users.interfaces"
import { AllUsersReturn } from "../../schemas/users.schema"
import { prisma } from "../../app"

const readAllUsersService = async (): Promise<IAllUserReturn> => {
  const allUsers = await prisma.user.findMany()

  return AllUsersReturn.parse(allUsers)
}

export default readAllUsersService
