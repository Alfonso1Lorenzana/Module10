import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const { Pool } = pg;

const dbPool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
  port: 5432,
});

const connect2Db = async () => {
  try {
    await dbPool.connect();
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
};

export { dbPool, connect2Db };