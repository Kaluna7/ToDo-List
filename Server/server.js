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

    res.json({ message: "Login successful!", email: user.email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post('/addtask', async (req ,res) => {
    const { email , title , description, duedate} = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO tasks (user_email , title , description, duedate) VALUES ($1, $2 , $3, $4) RETURNING * ',[email , title ,description, duedate]
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

app.get('/todaytask', async (req, res) => {
  const { email } = req.query;

  try {
    const result = await pool.query(
      `SELECT * 
         FROM tasks 
        WHERE user_email = $1 
          AND duedate = CURRENT_DATE`,
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get today's tasks!" });
  }
});

app.delete('/tasklist/:title', async (req, res) => {
  if (!req.session.loggedin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const title = decodeURIComponent(req.params.title);
  const userEmail = req.session.email;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE title = $1 AND user_email = $2 RETURNING *',
      [title, userEmail]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ 
      message: "Task deleted successfully",
      deletedTask: result.rows[0]
    });
    
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.get('/check-session', (req, res) => {
  res.json({
    loggedin: req.session.loggedin || false,
    email: req.session.email || null
  });
});

app.post('/sticky-note' , async (req , res) => {
  const { email , title , description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO sticky_notes ( email , title , description ) VALUES ($1, $2, $3) RETURNING * ',[email , title , description]
    );
    res.json({ message: 'Added sticky note successfully', todo: result.rows[0] });

  }catch (err) {
      console.error(err);
      res.status(500).json({err : 'Failed To Add Sticky Note!'});
    }
});

app.post('/addwork' , async (req , res) => {
  const { email , title , description , time } = req.body;

  try{ 
    const result = await pool.query(
      'INSERT INTO work ( email , title , description , time ) VALUES ($1, $2, $3 $4) RETURNING * ',[email , title , description , time]
    );
    res.json({ message: 'Added work successfully', todo: result.rows[0] });

  }catch (err) {
      console.error(err);
      res.status(500).json({err : 'Failed To Add Work!'});
    }
    });

    app.post('/addpersonal' , async (req , res) => {
  const { email , title , description , time } = req.body;

  try{ 
    const result = await pool.query(
      'INSERT INTO personal ( email , title , description , time ) VALUES ($1, $2, $3 $4) RETURNING * ',[email , title , description , time]
    );
    res.json({ message: 'Added personal successfully', todo: result.rows[0] });

  }catch (err) {
      console.error(err);
      res.status(500).json({err : 'Failed To Add Personal!'});
    }
    });

    app.post('/addstudy' , async (req , res) => {
  const { email , title , description , time } = req.body;

  try{ 
    const result = await pool.query(
      'INSERT INTO study ( email , title , description , time ) VALUES ($1, $2, $3 $4) RETURNING * ',[email , title , description , time]
    );
    res.json({ message: 'Added study successfully', todo: result.rows[0] });

  }catch (err) {
      console.error(err);
      res.status(500).json({err : 'Failed To Add Study!'});
    }
    });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
