const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/books", bookController.getAllBooks);
router.get("/books/isbn/:isbn", bookController.getBooksByISBN);
router.get("/books/author/:author", bookController.getBooksByAuthor);
router.get("/books/title/:title", bookController.getBooksByTitle);
router.get("/books/review/:isbn", bookController.getBookReview);

module.exports = router;
