import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { IUser } from "../../interfaces/users.interfaces"
import { prisma } from "../../app"
import AppError from "../../error"
import "dotenv/config"

const authService = async ({
  username,
  password,
}: Omit<IUser, "avatar">): Promise<object> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    throw new AppError("Wrong username or password.", 401)
  }

  const verifyPassword = await compare(password, user.password)

  if (!verifyPassword) {
    throw new AppError("Wrong username or password.", 401)
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("variable SECRET_KEY is not loaded")
  }

  const token = sign({}, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.id,
  })

  return {
    token,
  }
}

export default authService
