import { Router } from "express"
import { Auth } from "../schemas/auth.schema"
import { authController } from "../controllers/auth.controllers"
import * as middlewares from "../middlewares"

const authRouter = Router()

authRouter.post("", middlewares.validateSchemaMiddleware(Auth), authController)

export default authRouter
