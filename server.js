const express = require("express");
const pool = require("./db");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());

app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES ($1)  RETURNING *",
      [description]
    );
    res.json(newTodo);
    console.log(newTodo);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});
app.get("/todo", async (req, res) => {
  const alltodos = await pool.query("SELECT * FROM todo");
  if (alltodos) {
    res.json(alltodos);
    console.log(alltodos);
  }
  console.log(Error);
});

app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const requiredtodo = await pool.query(
    `SELECT * FROM todo WHERE todo_id = ${id}`
  );
  if (requiredtodo) {
    console.log(requiredtodo);
    res.json(requiredtodo);
  }
  console.log(Error);
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const deletetodo = await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`);
  if (deletetodo) {
    res.json(deletetodo);
    console.log(deletetodo);
  }
  console.log(Error);
});
app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updatetodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
  );
  if (updatetodo) {
    console.log(updatetodo);
    res.json(updatetodo);
  }
  console.log(Error);
});
app.listen(port, () => {
  console.log(`am listening to ${port}`);
});
