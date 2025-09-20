import authService from "../services/auth/auth.service"
import { Request, Response } from "express"

const authController = async (req: Request, res: Response) => {
  const data = await authService(req.body)

  return res.status(201).json(data)
}

export { authController }
