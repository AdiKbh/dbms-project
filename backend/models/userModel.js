const pool = require("../config/db");

// 🔍 Get user by email
const getUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

// ➕ Create new user
const createUser = async (name, email, password) => {
  return await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, password]
  );
};

module.exports = {
  getUserByEmail,
  createUser,
};
