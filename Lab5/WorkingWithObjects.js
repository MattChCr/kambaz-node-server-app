const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2025-10-10",
  completed: false,
  score: 0,
};

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { title } = req.params;
    assignment.title = title;
    res.json(assignment);
  };
  const getAssignmentCompleted = (req, res) => {
    res.json(assignment.completed);
  };
  const setAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    assignment.completed = completed === "true";
    res.json(assignment);
  };
  const getAssignmentScore = (req, res) => {
    res.json(assignment.score);
  };
  const setAssignmentScore = (req, res) => {
    const { score } = req.params;
    assignment.score = parseInt(score);
    res.json(assignment);
  };
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:title", setAssignmentTitle);
  app.get("/lab5/assignment/completed", getAssignmentCompleted);
  app.get("/lab5/assignment/completed/:completed", setAssignmentCompleted);
  app.get("/lab5/assignment/score", getAssignmentScore);
  app.get("/lab5/assignment/score/:score", setAssignmentScore);
}
