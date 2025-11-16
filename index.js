import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Database/User/routes.js";
import CourseRoutes from "./Kambaz/Database/Courses/routes.js";
import AssignmentRoutes from "./Kambaz/Database/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Database/Enrollments/routes.js";
import "dotenv/config";
import session from "express-session";
const app = express();
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentRoutes(app);
EnrollmentRoutes(app);
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL || "http://localhost:3000",
   
 }
)); 
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

app.use(express.json());                   
Lab5(app);                         
app.listen(process.env.PORT || 4000);