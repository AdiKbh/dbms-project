const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAdminByEmail, createAdmin } = require("../models/adminModel");

// 📝 Register Admin
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await getAdminByEmail(email);

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await createAdmin(email, hashedPassword);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔐 Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await getAdminByEmail(email);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.admin_id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...adminData } = admin;

    res.json({ token, admin: adminData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
