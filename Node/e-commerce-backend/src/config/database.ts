// src/config/database.ts
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// 1️⃣ Create Sequelize instance FIRST
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  }
);



// export default sequelize;
