import { Router } from "express"

import {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
  readAllUsersController,
} from "../controllers/users.controllers"
import { User, UserUpdate } from "../schemas/users.schema"
import * as middlewares from "../middlewares"

const usersRouter = Router()

usersRouter.post(
  "",
  middlewares.validateSchemaMiddleware(User),
  createUserController
)
// usersRouter.get("", readAllUsersController)
usersRouter.get(
  "/profile/:username",
  middlewares.validateTokenMiddleware,
  readUserController
)
usersRouter.patch(
  "/profile/:username",
  middlewares.validateTokenMiddleware,
  middlewares.validateSchemaMiddleware(UserUpdate),
  updateUserController
)
usersRouter.delete(
  "/profile/:username",
  middlewares.validateTokenMiddleware,
  deleteUserController
)

export default usersRouter
