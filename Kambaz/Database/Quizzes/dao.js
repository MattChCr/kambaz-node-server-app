import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// Get the last attempt for a user on a quiz
export async function getLastAttemptForUser(quizId, userId) {
  return model.findOne({ quiz: quizId, user: userId })
    .sort({ attemptNumber: -1 });
}

// Get all attempts for a user on a quiz
export async function getAttemptsForUser(quizId, userId) {
  return model.find({ quiz: quizId, user: userId })
    .sort({ attemptNumber: -1 });
}

// Get all attempts for a quiz (for faculty)
export async function getAllAttemptsForQuiz(quizId) {
  return model.find({ quiz: quizId })
    .sort({ user: 1, attemptNumber: -1 });
}

// Create a new attempt
export async function createAttempt(attemptData) {
  const newAttempt = {
    ...attemptData,
    _id: attemptData._id || uuidv4(),
  };
  return model.create(newAttempt);
}

// Get attempt count for a user on a quiz
export async function getAttemptCount(quizId, userId) {
  return model.countDocuments({ quiz: quizId, user: userId });
}

// Get attempt by ID
export async function getAttemptById(attemptId) {
  return model.findById(attemptId);
}

