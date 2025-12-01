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

app.use(cors({
   credentials: true,
   origin: function (origin, callback) {
     const allowedOrigins = [
       'http://localhost:3000',
       'http://localhost:5173',
       'https://chavaz-next-js-4550-git-a5-mattchcrs-projects.vercel.app',
       process.env.CLIENT_URL
     ].filter(Boolean);
     
     // Allow requests with no origin (like mobile apps, Postman, etc.)
     if (!origin) return callback(null, true);
     
     if (allowedOrigins.indexOf(origin) !== -1) {
       callback(null, true);
     } else {
       callback(new Error('Not allowed by CORS'));
     }
   }
 }));

// express.json() MUST be before routes to parse request bodies
app.use(express.json());

// Session middleware MUST be before routes to make req.session available
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SERVER_ENV !== "development", // true in production (HTTPS), false in dev (HTTP)
    sameSite: process.env.SERVER_ENV !== "development" ? "none" : "lax", // "none" for cross-origin, "lax" for same-origin
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  if (process.env.SERVER_URL) {
    sessionOptions.cookie.domain = process.env.SERVER_URL;
  }
}
app.use(session(sessionOptions));

// Routes registered AFTER middleware
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentRoutes(app);
EnrollmentRoutes(app);
ModulesRoutes(app, db);                   
Lab5(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Not allowed by CORS' });
  }
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.listen(process.env.PORT || 4000);
