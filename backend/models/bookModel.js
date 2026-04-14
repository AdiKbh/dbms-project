//defining the schema
const pool = require("../config/db");

// 📚 Get all books
const getAllBooks = async () => {
  return await pool.query("SELECT * FROM books");
};

// ➕ Add book (ID auto-generated)
const addBooks = async (title, author, total_copies) => {
  return await pool.query(
    `INSERT INTO books (title, author, total_copies, available_copies)
     VALUES ($1, $2, $3, $3)
     RETURNING *`,
    [title, author, total_copies]
  );
};

module.exports = {
  getAllBooks,
  addBooks,
};
