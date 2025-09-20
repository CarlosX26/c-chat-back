import { ExtendedError, Socket } from "socket.io"
import { verify } from "jsonwebtoken"
import AppError from "../error"
import "dotenv/config"

const authSocketMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  // const token = socket.handshake.auth.token
   const token = socket.handshake.query.token as string
  // console.log("🚀 ~ io.use ~ token:", token)

  if (!token) {
    return next(new AppError("Missing token.", 401))
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("variable SECRET_KEY is not loaded")
  }

  verify(token, process.env.SECRET_KEY, (error: any, decode: any) => {
    if (error) {
      return next(new AppError("Missing token.", 401))
    }

    socket.data = { userAuthId: decode?.sub }
  })

  next()
}

export default authSocketMiddleware
