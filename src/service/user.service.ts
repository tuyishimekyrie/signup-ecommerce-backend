import bcrypt from 'bcrypt';
import User from '../models/user.model';

interface UserData {
    userName : string,
    email: string,
    password: string,
    firstName:string,
    lastName:string,
}

export class UserService {
    static async createUser(userData: UserData): Promise<User> {
      try {
        const existingUserWithEmail  = await User.findOne({ where: { email: userData.email } });
  
        if (existingUserWithEmail ) {
          throw new Error("Email already exists");
        }

        const existingUserWithUserName = await User.findOne({ where: { userName: userData.userName } });
        if (existingUserWithUserName) {
            throw new Error("Username already exists");
        }
  
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
  
        // Create a new user
        const newUserCreated = await User.create({
          userName: userData.userName,
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName
        });
  
        // Omit password field from the returned User object
        const { password, ...newUser } = newUserCreated.toJSON();
  
        return newUser;

      } catch (error) {
        throw new Error('Could not create user: ' + error);
      }
    }

}