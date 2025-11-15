import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const createEnrollment = async (req, res) => {
    try {
      const { user, course } = req.body;
      
      // Check if enrollment already exists
      const existing = await dao.findEnrollmentByUserAndCourse(user, course);
      if (existing) {
        res.status(400).json({ message: "User is already enrolled in this course" });
        return;
      }

      const enrollment = await dao.createEnrollment(req.body);
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const findAllEnrollments = async (req, res) => {
    const { user, course } = req.query;
    
    if (user && course) {
      const enrollment = await dao.findEnrollmentByUserAndCourse(user, course);
      if (enrollment) {
        res.json([enrollment]);
      } else {
        res.json([]);
      }
    } else if (user) {
      const enrollments = await dao.findEnrollmentsByUser(user);
      res.json(enrollments);
    } else if (course) {
      const enrollments = await dao.findEnrollmentsByCourse(course);
      res.json(enrollments);
    } else {
      const enrollments = await dao.findAllEnrollments();
      res.json(enrollments);
    }
  };

  const findEnrollmentById = async (req, res) => {
    const { id } = req.params;
    const enrollment = await dao.findEnrollmentById(id);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404).json({ message: `Enrollment with ID ${id} not found` });
    }
  };

  const deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    const success = await dao.deleteEnrollment(id);
    if (success) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: `Enrollment with ID ${id} not found` });
    }
  };

  const unenroll = async (req, res) => {
    const { user, course } = req.body;
    const success = await dao.deleteEnrollmentByUserAndCourse(user, course);
    if (success) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Enrollment not found" });
    }
  };

  app.post("/api/enrollments", createEnrollment);
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/enrollments/:id", findEnrollmentById);
  app.delete("/api/enrollments/:id", deleteEnrollment);
  app.post("/api/enrollments/unenroll", unenroll);
}

