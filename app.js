const express = require("express");
const axios = require("axios");
const readline = require("readline");
require("dotenv").config();

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

app.use(express.json());

const books = [
  {
    isbn: "1234567890",
    title: "Sample Book One",
    author: "John Doe",
    reviews: [
      { username: "user1", review: "Great book!" },
      { username: "user2", review: "Informative read." },
    ],
  },
  {
    isbn: "0987654321",
    title: "Sample Book Two",
    author: "Jane Smith",
    reviews: [
      { username: "user3", review: "Could be better." },
      { username: "user4", review: "Loved it!" },
    ],
  },
  {
    isbn: "1111111111",
    title: "Another Book",
    author: "Alice Johnson",
    reviews: [{ username: "user1", review: "Not my type." }],
  },
];

const users = [{ username: "user1", password: "pass1" }];
let currentUser = null;

app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API.");
});

// General Users

// Task 1: Get the book list available in the shop
app.get("/books", (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Task 3: Get all books by Author
app.get("/books/author/:author", (req, res) => {
  const { author } = req.params;
  console.log(author);
  const authorBooks = books.filter((b) =>
    b.author.toLowerCase().includes(author.toLowerCase())
  );
  res.json(authorBooks);
});

// Task 4: Get all books based on Title
app.get("/books/title/:title", (req, res) => {
  const { title } = req.params;
  const titleBooks = books.filter((b) =>
    b.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(titleBooks);
});

// Task 5: Get book Review
app.get("/books/review/:isbn", (req, res) => {
  const { username } = req.body;
  const { isbn } = req.params;
  const user = users.find((user) => user.username === username);
  const book = books.find((b) => b.isbn === isbn);
  if (user) {
    currentUser = user;
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).send("Book not found");
    }
  } else {
    res.status(400).send("Invalid user");
  }
});

// Task 6: Register New User
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).send("Username already exists");
  }
  users.push({ username, password });
  res.status(201).send("User registered successfully");
});

// Task 7: Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    currentUser = user;
    res.send("User logged in successfully");
  } else {
    res.status(400).send("Invalid username or password");
  }
});

// Task 8: Add/Modify a book review
app.post("/books/review/addOrModify/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { username, password, review } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    currentUser = user;
    const book = books.find((b) => b.isbn === isbn);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    const existingReview = book.reviews.find(
      (r) => r.username === currentUser.username
    );
    if (existingReview) {
      existingReview.review = review;
    } else {
      book.reviews.push({ username: currentUser.username, review });
    }
    res.json(book);
  } else {
    res.status(400).send("Invalid user");
  }
});

// Task 9: Delete book review added by that particular user only
app.delete("/books/review/delete", (req, res) => {
  const { username, password, isbn } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    currentUser = user;
    const book = books.find((b) => b.isbn === isbn);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    const reviewIndex = book.reviews.findIndex((r) => r.username === username);
    if (reviewIndex !== -1) {
      book.reviews.splice(reviewIndex, 1);
      res.json(book);
    } else {
      res.status(404).send("Review not found");
    }
  } else {
    res.status(400).send("Invalid user");
  }
});

// Using google books API

// Task 10: Get all books
app.get("/books/async-callback", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${API_KEY}`
    );
    res.json(response.data.items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Task 11: Search by ISBN
app.get("/books/promise/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// Task 12: Search by Author
app.get("/books/promise/author/:author", async (req, res) => {
  const { author } = req.params;
  try {
    const response = await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`)
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Task 13: Search by Title
app.get("/books/promise/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const response = await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
