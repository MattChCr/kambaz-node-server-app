import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import AssignmentRoutes from "./Kambaz/Database/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Database/Enrollments/routes.js";

const app = express();
app.use(cors()); 
app.use(express.json());                   
Lab5(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
app.listen(4000);