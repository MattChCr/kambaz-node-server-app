import { v4 as uuidv4 } from "uuid";
import db from "../index.js";

export const createAssignment = (assignment) => {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  };
  db.assignments.push(newAssignment);
  return newAssignment;
};

export const findAllAssignments = () => db.assignments;

export const findAssignmentById = (id) => {
  return db.assignments.find((assignment) => assignment._id === id);
};

export const findAssignmentsByCourse = (courseId) => {
  return db.assignments.filter((assignment) => assignment.course === courseId);
};

export const updateAssignment = (id, assignmentUpdates) => {
  const index = db.assignments.findIndex((a) => a._id === id);
  if (index === -1) {
    return null;
  }
  db.assignments[index] = { ...db.assignments[index], ...assignmentUpdates, _id: id };
  return db.assignments[index];
};

export const deleteAssignment = (id) => {
  const index = db.assignments.findIndex((a) => a._id === id);
  if (index === -1) {
    return false;
  }
  db.assignments.splice(index, 1);
  return true;
};
