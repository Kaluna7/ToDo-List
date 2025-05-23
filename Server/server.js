import express from "express";
import { pool } from "./Database/db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Middleware for session
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.post("/signup", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
      [email, first_name, last_name, password_hash],
    );
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during signup." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

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

app.post("/addtask", async (req, res) => {
  const { email, title, description, duedate } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_email, title, description, duedate) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, title, description, duedate],
    );
    res.json({ message: "Added successfully", todo: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to add task!" });
  }
});

app.get("/tasklist", async (req, res) => {
  const { email } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_email = $1",
      [email],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to get task list!" });
  }
});

app.get("/todaytask", async (req, res) => {
  const { email } = req.query;

  try {
    const result = await pool.query(
      `SELECT *
         FROM tasks
        WHERE user_email = $1
          AND duedate = CURRENT_DATE`,
      [email],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get today's tasks!" });
  }
});

app.delete("/tasklist/:title", async (req, res) => {
  if (!req.session.loggedin) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Please log in first." });
  }

  const title = decodeURIComponent(req.params.title);
  const userEmail = req.session.email;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE title = $1 AND user_email = $2 RETURNING *",
      [title, userEmail],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task deleted successfully",
      deletedTask: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.get("/check-session", (req, res) => {
  res.json({
    loggedin: req.session.loggedin || false,
    email: req.session.email || null,
  });
});

app.post("/sticky-note", async (req, res) => {
  const { email, title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO sticky_notes (email, title, description) VALUES ($1, $2, $3) RETURNING *",
      [email, title, description],
    );
    res.json({
      message: "Added sticky note successfully",
      todo: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to add sticky note!" });
  }
});

app.post("/addwork", async (req, res) => {
  const { email, title, description, time } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO work (email, title, description, time) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, title, description, time],
    );
    res.json({ message: "Added work successfully", todo: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to add work!" });
  }
});

app.post("/addpersonal", async (req, res) => {
  const { email, title, description, time } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO personal (email, title, description, time) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, title, description, time],
    );
    res.json({
      message: "Added personal entry successfully",
      todo: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to add personal entry!" });
  }
});

app.post("/addstudy", async (req, res) => {
  const { email, title, description, time } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO study (email, title, description, time) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, title, description, time],
    );
    res.json({
      message: "Added study entry successfully",
      todo: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to add study entry!" });
  }
});

app.get("/getwork", async (req, res) => {
  const { email } = req.query;
  try {
    const result = await pool.query(
      "SELECT id, email, title, description, time FROM work WHERE email = $1 ORDER BY id ASC",
      [email],
    );
    console.log("GET /getwork → rows:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error GET /getwork:", err);
    res.status(500).json({ error: "Failed to get work." });
  }
});

app.get("/getpersonal", async (req, res) => {
  const { email } = req.query;

  try {
    const result = await pool.query("SELECT * FROM personal WHERE email = $1", [
      email,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get personal entries!" });
  }
});

app.get("/getstudy", async (req, res) => {
  const { email } = req.query;

  try {
    const result = await pool.query("SELECT * FROM study WHERE email = $1", [
      email,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get study entries!" });
  }
});

app.delete("/deletework", async (req, res) => {
  if (!req.session.loggedin) {
    console.log("DELETE /deletework → session.loggedin = false");
    return res
      .status(401)
      .json({ message: "Unauthorized. Please log in first." });
  }

  const { id } = req.query;
  const userEmail = req.session.email;

  console.log("DELETE /deletework → received id:", id);
  console.log("DELETE /deletework → session.email:", userEmail);

  if (!id) {
    console.log("DELETE /deletework → id not provided (400 Bad Request)");
    return res
      .status(400)
      .json({ message: "Parameter 'id' is required to delete work." });
  }

  try {
    const result = await pool.query(
      "DELETE FROM work WHERE id = $1 AND email = $2 RETURNING *",
      [id, userEmail],
    );

    if (result.rowCount === 0) {
      console.log(
        `DELETE /deletework → no row with id=${id} & email=${userEmail}`,
      );
      return res
        .status(404)
        .json({ message: "Work not found or does not belong to you." });
    }

    console.log("DELETE /deletework → successfully deleted:", result.rows[0]);
    res.json({
      message: "Work deleted successfully",
      deletedWork: result.rows[0],
    });
  } catch (err) {
    console.error("Error DELETE /deletework:", err);
    res.status(500).json({ message: "Failed to delete work." });
  }
});

app.delete("/deletestudy", async (req, res) => {
  if (!req.session.loggedin) {
    console.log("DELETE /deletestudy → session.loggedin = false");
    return res
      .status(401)
      .json({ message: "Unauthorized. Please log in first." });
  }

  const { id } = req.query;
  const userEmail = req.session.email;

  console.log("DELETE /deletestudy → received id:", id);
  console.log("DELETE /deletestudy → session.email:", userEmail);

  if (!id) {
    console.log("DELETE /deletestudy → id not provided (400 Bad Request)");
    return res
      .status(400)
      .json({ message: "Parameter 'id' is required to delete study." });
  }

  try {
    const result = await pool.query(
      "DELETE FROM study WHERE id = $1 AND email = $2 RETURNING *",
      [id, userEmail],
    );

    if (result.rowCount === 0) {
      console.log(
        `DELETE /deletestudy → no row with id=${id} & email=${userEmail}`,
      );
      return res
        .status(404)
        .json({ message: "Study not found or does not belong to you." });
    }

    console.log("DELETE /deletestudy → successfully deleted:", result.rows[0]);
    res.json({
      message: "Study deleted successfully",
      deletedStudy: result.rows[0],
    });
  } catch (err) {
    console.error("Error DELETE /deletestudy:", err);
    res.status(500).json({ message: "Failed to delete study." });
  }
});

app.delete("/deletepersonal", async (req, res) => {
  if (!req.session.loggedin) {
    console.log("DELETE /deletepersonal → session.loggedin = false");
    return res
      .status(401)
      .json({ message: "Unauthorized. Please log in first." });
  }

  const { id } = req.query;
  const userEmail = req.session.email;

  console.log("DELETE /deletepersonal → received id:", id);
  console.log("DELETE /deletepersonal → session.email:", userEmail);

  if (!id) {
    console.log("DELETE /deletepersonal → id not provided (400 Bad Request)");
    return res
      .status(400)
      .json({
        message: "Parameter 'id' is required to delete personal entry.",
      });
  }

  try {
    const result = await pool.query(
      "DELETE FROM personal WHERE id = $1 AND email = $2 RETURNING *",
      [id, userEmail],
    );

    if (result.rowCount === 0) {
      console.log(
        `DELETE /deletepersonal → no row with id=${id} & email=${userEmail}`,
      );
      return res
        .status(404)
        .json({
          message: "Personal entry not found or does not belong to you.",
        });
    }

    console.log(
      "DELETE /deletepersonal → successfully deleted:",
      result.rows[0],
    );
    res.json({
      message: "Personal entry deleted successfully",
      deletedPersonal: result.rows[0],
    });
  } catch (err) {
    console.error("Error DELETE /deletepersonal:", err);
    res.status(500).json({ message: "Failed to delete personal entry." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
