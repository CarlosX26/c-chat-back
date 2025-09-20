import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod"

const validateSchemaMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const schemaValid = schema.safeParse(req.body)

    if (!schemaValid.success) {
      return res.status(400).json(schemaValid.error.flatten().fieldErrors)
    }

    req.body = schemaValid.data

    return next()
  }

export default validateSchemaMiddleware
