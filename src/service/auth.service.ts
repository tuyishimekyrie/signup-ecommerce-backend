import { User } from '../models';
import sendEmail from '../helpers/sendEmail';
import crypto from 'crypto';
import { Op } from 'sequelize';
import { resetPasswordTemplate } from '../helpers/EmailTemplates/resetPasswordTemplate';

class AuthService {
  public static async querySingleUser(options: any): Promise<User> {
    const user = await User.findOne({ where: options });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  public static async forgotPassword(email: string) {
    const user = await AuthService.querySingleUser({ email });
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    ).toISOString();

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Create reset password link
    const resetUrl = `${process.env.DEPLOYED_URL}/api/v1/auth/reset-password/${resetToken}`;

    // Generate email content (HTML format recommended for better formatting)
    const emailContent = resetPasswordTemplate(resetUrl);

    await sendEmail(user.email, 'Password Reset', emailContent); // Send email using sendEmail function

    return 'A password reset link has been sent to your email';
  }

  public static async resetPassword(token: string, password: string) {
    if (!password || !token) {
      throw new Error('Password and token are required');
    }

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: {
          [Op.gt]: Date.now(), // Check for expiration time greater than current time
        },
      },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // Hash the new password before saving
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    user.password = hashedPassword;
    user.resetToken = null; // Clear reset token after successful password change
    user.resetTokenExpiration = null;
    await user.save();

    return 'Password reset successful';
  }
}

export default AuthService;
