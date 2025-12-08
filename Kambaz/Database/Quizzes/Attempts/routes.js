import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  
  const getMyAttempt = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const { qid } = req.params;
      const attempt = await dao.getLastAttemptForUser(qid, currentUser._id);
      
      if (!attempt) {
        return res.status(404).json({ message: "No attempts found" });
      }
      
      res.json(attempt);
    } catch (error) {
      console.error("Error getting attempt:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const getMyAllAttempts = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const { qid } = req.params;
      const attempts = await dao.getAttemptsForUser(qid, currentUser._id);
      
      res.json(attempts);
    } catch (error) {
      console.error("Error getting attempts:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const submitAttempt = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const { qid } = req.params;
      const attemptCount = await dao.getAttemptCount(qid, currentUser._id);
      
      const attemptData = {
        ...req.body,
        quiz: qid,
        user: currentUser._id,
        attemptNumber: attemptCount + 1,
        submittedAt: new Date()
      };
      
      const attempt = await dao.createAttempt(attemptData);
      res.json(attempt);
    } catch (error) {
      console.error("Error submitting attempt:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const getAllAttempts = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const { qid } = req.params;
      const attempts = await dao.getAllAttemptsForQuiz(qid);
      
      res.json(attempts);
    } catch (error) {
      console.error("Error getting all attempts:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:cid/quizzes/:qid/attempts/me/all", getMyAllAttempts);
  app.get("/api/courses/:cid/quizzes/:qid/attempts/me", getMyAttempt);
  app.get("/api/courses/:cid/quizzes/:qid/attempts", getAllAttempts);
  app.post("/api/courses/:cid/quizzes/:qid/attempts", submitAttempt);
}

