import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const createAssignment = async (req, res) => {
    try {
      const assignment = await dao.createAssignment(req.body);
      res.json(assignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const findAllAssignments = async (req, res) => {
    try {
      const { course } = req.query;
      if (course) {
        const assignments = await dao.findAssignmentsByCourse(course);
        res.json(assignments);
      } else {
        const assignments = await dao.findAllAssignments();
        res.json(assignments);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAssignmentById = async (req, res) => {
    try {
      const { id } = req.params;
      const assignment = await dao.findAssignmentById(id);
      if (assignment) {
        res.json(assignment);
      } else {
        res.status(404).json({ message: `Assignment with ID ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      const { id, assignmentId } = req.params;
      const targetId = assignmentId || id;
      const assignment = await dao.updateAssignment(targetId, req.body);
      if (assignment) {
        res.json(assignment);
      } else {
        res.status(404).json({ message: `Assignment with ID ${targetId} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      const { id, assignmentId } = req.params;
      const targetId = assignmentId || id;
      const success = await dao.deleteAssignment(targetId);
      if (success) {
        res.sendStatus(200);
      } else {
        res.status(404).json({ message: `Assignment with ID ${targetId} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsByCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createAssignmentForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = {
        ...req.body,
        course: courseId,
      };
      const newAssignment = await dao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  app.post("/api/assignments", createAssignment);
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:id", findAssignmentById);
  app.put("/api/assignments/:id", updateAssignment);
  app.delete("/api/assignments/:id", deleteAssignment);
  
  // Course-specific assignment routes
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);
}

