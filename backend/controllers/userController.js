const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id, name, email FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProfile,
};
