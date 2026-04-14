// handles logic of the backend
// receives request from frontend , and sends the response
const pool = require("../config/db");

const getBooks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addBook = async (req, res) => {
  const { title, author, total_copies } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, total_copies, available_copies) VALUES ($1, $2, $3, $3) RETURNING *",
      [title, author, total_copies]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBooks,
  addBook,
};
