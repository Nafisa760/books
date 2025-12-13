import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },

  ratings: [
    {
      studentUsername: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 }
    }
  ]
});

export default mongoose.model("Book", bookSchema);
