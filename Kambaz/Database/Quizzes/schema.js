import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  _id: String,
  quiz: { type: String, required: true },
  user: { type: String, required: true },
  answers: [{
    questionId: { type: String, required: true },
    answer: { type: mongoose.Schema.Types.Mixed, required: true }
  }],
  score: { type: Number, required: true },
  attemptNumber: { type: Number, required: true, default: 1 },
  submittedAt: { type: Date, default: Date.now }
}, { collection: "quizAttempts" });

export default quizAttemptSchema;

