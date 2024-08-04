const bookService = require("../services/bookService");

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByISBN = async (req, res) => {
  try {
    const books = await bookService.getBooksByISBN(req.params.isbn);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByAuthor = async (req, res) => {
  try {
    const books = await bookService.getBooksByAuthor(req.params.author);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByTitle = async (req, res) => {
  try {
    const books = await bookService.getBooksByTitle(req.params.title);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookReview = async (req, res) => {
  try {
    const reviews = await bookService.getBookReview(req.params.isbn);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
};
