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
    const { course } = req.query;
    if (course) {
      const assignments = await dao.findAssignmentsByCourse(course);
      res.json(assignments);
    } else {
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    }
  };

  const findAssignmentById = async (req, res) => {
    const { id } = req.params;
    const assignment = await dao.findAssignmentById(id);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: `Assignment with ID ${id} not found` });
    }
  };

  const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const assignment = await dao.updateAssignment(id, req.body);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: `Assignment with ID ${id} not found` });
    }
  };

  const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    const success = await dao.deleteAssignment(id);
    if (success) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: `Assignment with ID ${id} not found` });
    }
  };

  app.post("/api/assignments", createAssignment);
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:id", findAssignmentById);
  app.put("/api/assignments/:id", updateAssignment);
  app.delete("/api/assignments/:id", deleteAssignment);
}

