import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  course: { type: String, required: true },
  description: String,
  quizType: { type: String, enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"], default: "GRADED_QUIZ" },
  points: { type: Number, default: 0 },
  assignmentGroup: { type: String, enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"], default: "QUIZZES" },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  howManyAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { type: Boolean, default: false },
  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },
  dueDate: String,
  availableDate: String,
  untilDate: String,
  published: { type: Boolean, default: false },
  questions: [{
    _id: String,
    title: String,
    type: { type: String, enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"] },
    points: Number,
    question: String,
    choices: [String],
    correctAnswer: mongoose.Schema.Types.Mixed
  }]
}, { collection: "quizzes" });

export default quizSchema;
