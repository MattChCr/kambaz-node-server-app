import { v4 as uuidv4 } from "uuid";
import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import grades from "./grades.js";
import enrollments from "./enrollments.js";

// Create mutable copies of all data arrays so they can be modified
export default {
  courses: courses.map(c => ({ ...c })),
  modules: modules.map(m => ({ ...m, _id: m._id || uuidv4() })),
  assignments: assignments.map(a => ({ ...a })),
  users: users.map(u => ({ ...u })),
  grades: grades.map(g => ({ ...g })),
  enrollments: enrollments.map(e => ({ ...e })),
};