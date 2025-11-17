import { v4 as uuidv4 } from "uuid";
import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import grades from "./grades.js";
import enrollments from "./enrollments.js";

// Ensure all modules have _id fields (add _id to modules that don't have one)
const modulesWithIds = modules.map(module => {
  if (!module._id) {
    return { ...module, _id: uuidv4() };
  }
  return module;
});

export default { courses, modules: modulesWithIds, assignments, users, grades, enrollments };