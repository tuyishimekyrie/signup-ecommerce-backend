import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
export const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }
    next()
  }
}
export const UserSchema = {
  signUp: Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
}