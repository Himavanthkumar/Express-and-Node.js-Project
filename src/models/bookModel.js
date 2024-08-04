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

const getAllBooks = () => books;

const getBooksByISBN = (isbn) => books.filter((book) => book.isbn === isbn);

const getBooksByAuthor = (author) =>
  books.filter((book) => book.author === author);

const getBooksByTitle = (title) =>
  books.filter((book) => book.title.includes(title));

const getBookReview = (isbn) =>
  books.find((book) => book.isbn === isbn)?.reviews || [];

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
};
