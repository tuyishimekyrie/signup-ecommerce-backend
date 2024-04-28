import { Request, Response } from 'express'
import AuthService from '../service/auth.service'

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const message = await AuthService.forgotPassword(email)
    return res.status(200).json({ message })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message })
    }
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body
    const message = await AuthService.resetPassword(token, password)
    return res.status(200).json({ message })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message })
    }
  }
}

