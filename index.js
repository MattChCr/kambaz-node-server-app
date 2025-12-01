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

// REQUIRED for Render - trust the proxy
app.set("trust proxy", 1);

// CORS - must allow credentials and your Vercel origin
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://chavaz-next-js-4550-git-a5-mattchcrs-projects.vercel.app",
      process.env.CLIENT_URL
    ].filter(Boolean);
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// Parse JSON
app.use(express.json());

// Session - configured for cross-origin (Vercel <-> Render)
app.use(session({
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

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
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Not allowed by CORS" });
  }
  res.status(500).json({ message: err.message || "Internal server error" });
});

app.listen(process.env.PORT || 4000);
