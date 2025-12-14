import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import User from "./Models/UserModel.js";
import Book from "./Models/Book.js";
import BorrowedBook from "./Models/BorrowedBookModel.js";
import * as ENV from "./config.js";

const app = express();
//Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://books-client-jqdt.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

//app.use(cors());

//const connectString = "mongodb+srv://66s2026_db_user:admin123@booksappcluster.wsrbpoa.mongodb.net/BooksDb?retryWrites=true&w=majority";
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(connectString)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// --------------------
// 🔹 Users Routes
// --------------------

// Register User
app.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    if (!fullName || !username || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const exist = await User.findOne({ username });
    if (exist) return res.json({ success: false, message: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      role: "student",
    });

    await newUser.save();
    res.json({ success: true, message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    res.json({
      success: true,
      message: "Login successful",
      user: { username: user.username, fullName: user.fullName, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// --------------------
// 🔹 Books Routes
// --------------------

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add book
app.post("/books", async (req, res) => {
  const { title, author, year } = req.body;
  try {
    if (!title || !author || !year) return res.status(400).json({ success: false, message: "Missing fields" });

    const newBook = new Book({ title, author, year });
    await newBook.save();
    res.json({ success: true, message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update book
app.put("/books/:id", async (req, res) => {
  const { title, author, year } = req.body;
  try {
    await Book.findByIdAndUpdate(req.params.id, { title, author, year });
    res.json({ success: true, message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete book
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --------------------
// 🔹 Borrow & Return
// --------------------

// Borrow book
app.post("/borrow", async (req, res) => {
  const { username, bookId } = req.body;
  try {
    if (!username || !bookId) return res.status(400).json({ success: false, message: "Missing fields" });

    const exist = await BorrowedBook.findOne({ studentUsername: username, bookId, returnedAt: null });
    if (exist) return res.json({ success: false, message: "Book already borrowed" });

    const borrowed = new BorrowedBook({ studentUsername: username, bookId });
    await borrowed.save();
    res.json({ success: true, message: "Book borrowed successfully", data: borrowed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Return book
app.put("/borrowedbooks/return/:id", async (req, res) => {
  const { rating, feedback } = req.body;
  try {
    const borrowed = await BorrowedBook.findById(req.params.id);
    if (!borrowed) return res.status(404).json({ success: false, message: "Borrowed book not found" });

    borrowed.returnedAt = new Date();
    borrowed.rating = rating ?? borrowed.rating;
    borrowed.feedback = feedback ?? borrowed.feedback;
    await borrowed.save();

    res.json({ success: true, message: "Book returned successfully", data: borrowed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --------------------
// 🔹 Rate a Book
// --------------------
app.post("/books/rate", async (req, res) => {
  const { username, bookId, rating } = req.body;
  try {
    if (!username || !bookId || !rating) return res.status(400).json({ success: false, message: "Missing fields" });
    if (rating < 1 || rating > 5) return res.status(400).json({ success: false, message: "Rating must be 1-5" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    const index = book.ratings.findIndex(r => r.studentUsername === username);
    if (index !== -1) book.ratings[index].rating = rating;
    else book.ratings.push({ studentUsername: username, rating });

    await book.save();
    res.json({ success: true, message: "Book rated successfully", ratings: book.ratings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --------------------
// 🔹 Get Borrowed Books
// --------------------

// جلب الكتب الخاصة بالطالب
// كتب المستخدم فقط
app.get("/borrowedbooks/:username", async (req, res) => {
  try {
    const borrowed = await BorrowedBook.find({ 
      studentUsername: req.params.username, 
      returnedAt: null 
    }).populate("bookId");
    res.json(borrowed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// جلب كل الكتب المقترضة (Admin)
app.get("/borrowedbooks/all", async (req, res) => {
  try {
    const borrowed = await BorrowedBook.find().populate("bookId"); // populate عشان تجيب تفاصيل الكتاب
    res.json(borrowed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/*
app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
*/

const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
