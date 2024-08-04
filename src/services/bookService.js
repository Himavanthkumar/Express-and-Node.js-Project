const bookModel = require("../models/bookModel");

const getAllBooks = async () => {
  return bookModel.getAllBooks();
};

const getBooksByISBN = async (isbn) => {
  return bookModel.getBooksByISBN(isbn);
};

const getBooksByAuthor = async (author) => {
  return bookModel.getBooksByAuthor(author);
};

const getBooksByTitle = async (title) => {
  return bookModel.getBooksByTitle(title);
};

const getBookReview = async (isbn) => {
  return bookModel.getBookReview(isbn);
};

// Task 10: Get all books – Using async callback function
const getAllBooksAsync = (callback) => {
  setTimeout(() => {
    const books = bookModel.getAllBooks();
    callback(null, books);
  }, 1000);
};

// Task 11: Search by ISBN – Using Promises
const getBooksByISBNPromise = (isbn) => {
  return new Promise((resolve, reject) => {
    const books = bookModel.getBooksByISBN(isbn);
    if (books.length > 0) {
      resolve(books);
    } else {
      reject("No books found");
    }
  });
};

// Task 12: Search by Author – Using Promises
const getBooksByAuthorPromise = (author) => {
  return new Promise((resolve, reject) => {
    const books = bookModel.getBooksByAuthor(author);
    if (books.length > 0) {
      resolve(books);
    } else {
      reject("No books found");
    }
  });
};

// Task 13: Search by Title – Using Promises
const getBooksByTitlePromise = (title) => {
  return new Promise((resolve, reject) => {
    const books = bookModel.getBooksByTitle(title);
    if (books.length > 0) {
      resolve(books);
    } else {
      reject("No books found");
    }
  });
};

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
  getAllBooksAsync,
  getBooksByISBNPromise,
  getBooksByAuthorPromise,
  getBooksByTitlePromise,
};
