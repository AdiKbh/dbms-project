const express = require("express");
const router = express.Router();

const { getBooks } = require("../controllers/bookController");
const { addBook } = require("../controllers/bookController");
// 📚 Get all books
router.get("/", getBooks);
router.post("/post", addBook);
module.exports = router;
