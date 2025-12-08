import * as dao from "./dao.js";

export default function QuizRoutes(app) {

  const findQuizzesForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const quizzes = await dao.findQuizzesForCourse(cid);
      res.json(quizzes);
    } catch (error) {
      console.error("Error finding quizzes:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const findQuizById = async (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = await dao.findQuizById(qid);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error finding quiz:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const createQuiz = async (req, res) => {
    try {
      const { cid } = req.params;
      const quizData = {
        ...req.body,
        course: cid,
      };
      const quiz = await dao.createQuiz(quizData);
      res.json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const updateQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = await dao.updateQuiz(qid, req.body);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = await dao.deleteQuiz(qid);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const publishQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const { published } = req.body;
      const quiz = await dao.publishQuiz(qid, published);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error publishing quiz:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
  app.put("/api/courses/:cid/quizzes/:qid", updateQuiz);
  app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);
  app.put("/api/courses/:cid/quizzes/:qid/publish", publishQuiz);
}
