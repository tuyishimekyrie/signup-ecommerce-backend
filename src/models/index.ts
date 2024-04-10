import { DataTypes, Model } from 'sequelize';
import sequelize from "../db/config";

class User extends Model {
    username!: string;
    email!: string;
    password!: string;
  }
  
   User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        
    tableName: 'users',
    sequelize,
    }
  );
  
  export default User;