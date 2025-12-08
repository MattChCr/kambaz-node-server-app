import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function getLastAttemptForUser(quizId, userId) {
  return model.findOne({ quiz: quizId, user: userId })
    .sort({ attemptNumber: -1 });
}

export async function getAttemptsForUser(quizId, userId) {
  return model.find({ quiz: quizId, user: userId })
    .sort({ attemptNumber: -1 });
}

export async function getAllAttemptsForQuiz(quizId) {
  return model.find({ quiz: quizId })
    .sort({ user: 1, attemptNumber: -1 });
}

export async function createAttempt(attemptData) {
  const newAttempt = {
    ...attemptData,
    _id: attemptData._id || uuidv4(),
  };
  return model.create(newAttempt);
}

export async function getAttemptCount(quizId, userId) {
  return model.countDocuments({ quiz: quizId, user: userId });
}

export async function getAttemptById(attemptId) {
  return model.findById(attemptId);
}

