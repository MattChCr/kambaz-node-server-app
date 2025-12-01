import UsersDao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  const createUser = (req, res) => {
    if (!req.body || !req.body.username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      return res.status(400).json({ message: "Username already in use" });
    }
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };

  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(200);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  };

  const findUsersForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsByCourse(courseId);
    const userIds = enrollments.map((e) => e.user);
    const users = dao.findAllUsers().filter((u) => userIds.includes(u._id));
    res.json(users);
  };

  const updateUser = (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    if (!userUpdates || Object.keys(userUpdates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }
    const existingUser = dao.findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }
    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    // Update session if user is updating their own profile
    if (req.session["currentUser"] && req.session["currentUser"]._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    res.json(updatedUser);
  };
  const signup = (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      return res.status(400).json({ message: "Username already in use" });
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }
      const currentUser = dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ message: error.message || "Internal server error" });
    }
  };
  const signout = (req, res) => { 
    req.session.destroy();
    res.sendStatus(200);
};
  const profile = (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      res.json(currentUser);
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({ message: error.message || "Internal server error" });
    }
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}
