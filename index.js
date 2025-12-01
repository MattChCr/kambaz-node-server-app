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

// 1. Trust proxy FIRST (REQUIRED for Render/Heroku)
app.set("trust proxy", 1);

// 2. CORS - must be before session
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://chavaz-next-js-4550-git-a5-mattchcrs-projects.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, origin); // Return the actual origin, not true
      } else {
        console.log("CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// 3. Parse JSON
app.use(express.json());

// 4. Session - AFTER cors, BEFORE routes
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for Render
    cookie: {
      secure: true,       // HTTPS only
      sameSite: "none",   // Cross-origin
      httpOnly: true,     // No JS access
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// 5. Routes
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentRoutes(app);
EnrollmentRoutes(app);
ModulesRoutes(app, db);
Lab5(app);

// 6. Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Allowed origins:", allowedOrigins);
});
