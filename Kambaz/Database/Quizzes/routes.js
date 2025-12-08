import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  
  // GET /api/courses/:cid/quizzes/:qid/attempts/me
  // Get the current user's last attempt for a quiz
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

  // GET /api/courses/:cid/quizzes/:qid/attempts/me/all
  // Get all of the current user's attempts for a quiz
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

  // POST /api/courses/:cid/quizzes/:qid/attempts
  // Submit a new quiz attempt
  const submitAttempt = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const { qid } = req.params;
      
      // Get current attempt count to determine attempt number
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

  // GET /api/courses/:cid/quizzes/:qid/attempts
  // Get all attempts for a quiz (for faculty)
  const getAllAttempts = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Optional: Check if user is faculty
      // if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
      //   return res.status(403).json({ message: "Forbidden" });
      // }
      
      const { qid } = req.params;
      const attempts = await dao.getAllAttemptsForQuiz(qid);
      
      res.json(attempts);
    } catch (error) {
      console.error("Error getting all attempts:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Register routes - ORDER MATTERS: more specific routes first
  app.get("/api/courses/:cid/quizzes/:qid/attempts/me/all", getMyAllAttempts);
  app.get("/api/courses/:cid/quizzes/:qid/attempts/me", getMyAttempt);
  app.get("/api/courses/:cid/quizzes/:qid/attempts", getAllAttempts);
  app.post("/api/courses/:cid/quizzes/:qid/attempts", submitAttempt);
}

