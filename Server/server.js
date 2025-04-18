import express from "express";
import { pool } from "./Database/db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware untuk session
app.use(session({
  secret: "Secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));


app.post("/signup", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
      [email, first_name, last_name, password_hash]
    );
    res.status(201).json({ message: "Signup successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during signup." });
  }
});


app.post("/login", async (req, res) => {

  const { email, password } = req.body;
  
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Incorrect email or password!" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect email or password!" });
    }
    req.session.loggedin = true;
    req.session.email = user.email;

    res.json({ message: "Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post('/addtask', async (req ,res) => {
    const { email , title , description} = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO tasks (user_email , title , description) VALUES ($1, $2 , $3) RETURNING * ',[email , title ,description]
      );
      res.json({message : 'Added Successfuly' , todo: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({err : 'Failed To Add Task!'});
    }
});


app.get('/tasklist' , async (req , res) => {
  const {email} = req.query;

  try{
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_email = $1',
      [email]
    );
    res.json(result.rows);
  } catch (err){
    console.error(err);
    res.status(500).json({err : 'Failed To Get Today Task!'})
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
