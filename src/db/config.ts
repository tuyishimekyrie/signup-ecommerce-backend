
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.PGDATABASE!, process.env.PGUSER!,process.env.PGPASSWORD!, {
    host: process.env.PGHOST!,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  });
export default sequelize;

