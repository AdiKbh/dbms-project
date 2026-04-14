const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost", // 🔥 FIXED
  database: "library-management-system",
  password: "adi",
  port: 5432,
});
// Test connection
pool
  .connect()
  .then(() => console.log("PostgreSQL Connected ✅"))
  .catch((err) => console.error("Connection Error ❌", err));

module.exports = pool;
