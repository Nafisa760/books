import mongoose from "mongoose";
import BorrowedBook from "./Models/BorrowedBookModel.js";
import Book from "./Models/Book.js";

// 🔹 وصل للقاعدة
const connectString = "mongodb+srv://66s2026_db_user:admin123@booksappcluster.wsrbpoa.mongodb.net/BooksDb?retryWrites=true&w=majority";

mongoose.connect(connectString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Error:", err));

async function fixAllBorrowedBooks() {
  try {
    const borrowedBooks = await BorrowedBook.find();

    for (const b of borrowedBooks) {
      // جلب الكتاب الصحيح بناءً على الـ ObjectId
      const book = await Book.findById(b.bookId);

      if (!book) {
        console.log(`❌ Book not found for borrowedBook ${b._id}, skipping...`);
        continue;
      }

      // نعيد تعيين الـ bookId فقط إذا لازم
      if (!b.bookId || b.bookId.toString() !== book._id.toString()) {
        console.log(`🔧 Fixing borrowedBook ${b._id}: setting bookId → ${book._id}`);
        b.bookId = book._id;
        await b.save();
      }
    }

    console.log("✅ All borrowedBooks fixed!");
    mongoose.disconnect();
  } catch (err) {
    console.log("Error:", err);
    mongoose.disconnect();
  }
}

fixAllBorrowedBooks();
