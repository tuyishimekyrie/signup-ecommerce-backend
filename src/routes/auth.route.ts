import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers';
import { AuthSchema, validateSchema } from '../validations/auth.validation';
const authRoute = Router();

authRoute.post(
  '/forgot-password',
  validateSchema(AuthSchema.forgotPassword),
  forgotPassword,
);
authRoute.post(
  '/reset-password',
  validateSchema(AuthSchema.resetPassword),
  resetPassword,
);

export { authRoute };
