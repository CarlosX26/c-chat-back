import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import "dotenv/config"

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headersAuthorization = req.headers.authorization
  if (!headersAuthorization) {
    return res.status(401).json({
      message: "Authenticate to access.",
    })
  }

  const token = headersAuthorization.split(" ")[1]
  if (token === "undefined") {
    return res.status(401).json({
      message: "Authenticate to access.",
    })
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("variable SECRET_KEY is not loaded")
  }

  verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
      return res.status(401).json({
        message: error.message,
      })
    }

    req.userAuthId = `${decode?.sub}`
  })

  return next()
}

export default validateTokenMiddleware
