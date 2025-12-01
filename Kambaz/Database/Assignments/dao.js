import { v4 as uuidv4 } from "uuid";

let assignments = [];

export const createAssignment = (assignment) => {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  };
  assignments.push(newAssignment);
  return newAssignment;
};

export const findAllAssignments = () => assignments;

export const findAssignmentById = (id) => {
  return assignments.find((assignment) => assignment._id === id);
};

export const findAssignmentsByCourse = (courseId) => {
  return assignments.filter((assignment) => assignment.course === courseId);
};

export const updateAssignment = (id, assignment) => {
  const index = assignments.findIndex((a) => a._id === id);
  if (index === -1) {
    return null;
  }
  assignments[index] = { ...assignments[index], ...assignment, _id: id };
  return assignments[index];
};

export const deleteAssignment = (id) => {
  const index = assignments.findIndex((a) => a._id === id);
  if (index === -1) {
    return false;
  }
  assignments.splice(index, 1);
  return true;
};

