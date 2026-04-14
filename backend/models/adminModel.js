const pool = require("../config/db");

// 🔍 Get admin by email
const getAdminByEmail = async (email) => {
  return await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
};

// ➕ Create admin
const createAdmin = async (email, password) => {
  return await pool.query(
    `INSERT INTO admins (email, password)
     VALUES ($1, $2)
     RETURNING *`,
    [email, password]
  );
};

module.exports = {
  getAdminByEmail,
  createAdmin,
};
