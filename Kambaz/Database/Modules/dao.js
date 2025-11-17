import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
 function findModulesForCourse(courseId) {
   return db.modules.filter((module) => module.course === courseId);
 }
 
 function deleteModule(moduleId) {
   const index = db.modules.findIndex((module) => module._id === moduleId);
   if (index !== -1) {
     db.modules.splice(index, 1);
     return true;
   }
   return false;
 }

 function createModule(module) {
   const newModule = { ...module, _id: uuidv4() };
   db.modules.push(newModule);
   return newModule;
 }

 function updateModule(moduleId, moduleUpdates) {
   const module = db.modules.find((module) => module._id === moduleId);
   if (module) {
     Object.assign(module, moduleUpdates);
     return module;
   }
   return null;
 }

 return {
   findModulesForCourse,
   deleteModule,
   createModule,
   updateModule,
 };
}
