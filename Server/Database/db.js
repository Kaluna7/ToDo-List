import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "12345",
  port: 5432
});

