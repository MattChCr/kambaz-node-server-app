import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export async function findQuizById(quizId) {
  return model.findById(quizId);
}

export async function createQuiz(quizData) {
  const newQuiz = {
    ...quizData,
    _id: quizData._id || uuidv4(),
  };
  return model.create(newQuiz);
}

export async function updateQuiz(quizId, quizUpdates) {
  return model.findByIdAndUpdate(quizId, quizUpdates, { new: true });
}

export async function deleteQuiz(quizId) {
  return model.findByIdAndDelete(quizId);
}

export async function publishQuiz(quizId, published) {
  return model.findByIdAndUpdate(quizId, { published }, { new: true });
}
