import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Database/User/routes.js";
import CourseRoutes from "./Kambaz/Database/Courses/routes.js";
import AssignmentRoutes from "./Kambaz/Database/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Database/Enrollments/routes.js";
import ModulesRoutes from "./Kambaz/Database/Modules/routes.js";
import "dotenv/config";
import session from "express-session";

const app = express();

// 1. Trust proxy (REQUIRED for Render)
app.set("trust proxy", 1);

// 2. CORS with credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://chavaz-next-js-4550-git-a5-mattchcrs-projects.vercel.app",
    credentials: true,
  })
);

// 3. Parse JSON bodies
app.use(express.json());

// 4. Session with cross-origin cookie settings
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Routes
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentRoutes(app);
EnrollmentRoutes(app);
ModulesRoutes(app, db);
Lab5(app);

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
