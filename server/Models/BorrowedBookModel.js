import mongoose from "mongoose";

const borrowedBookSchema = new mongoose.Schema({
  studentUsername: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date, default: null },
  rating: { type: Number, default: 0 },
  feedback: { type: String, default: "" }
});

export default mongoose.model("BorrowedBook", borrowedBookSchema);
