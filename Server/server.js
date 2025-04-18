import express from "express";
import { pool } from "./Database/db.js";
import cors from "cors";
import bcrypt from "bcrypt";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email , first_name , last_name , password} = req.body;
  const password_hash = await bcrypt.hash(password, 10)
  await pool.query("INSERT INTO users (email , first_name , last_name, password) VALUES ($1,$2,$3,$4)", [email , first_name , last_name , password_hash]);
  res.json({message : "Signup Succesfully!"})
});

app.get("/login", async (req , res) => {
  const { email , password} = req.body;
  await pool.query("SELECT * FROM users (email , password)",[email , password]);
  res.json({message : "Login Succesfully"})
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost: ${PORT}`);
});
