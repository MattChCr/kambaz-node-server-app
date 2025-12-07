import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createAssignment = async (assignment) => {
  const newAssignment = {
    ...assignment,
    _id: assignment._id || uuidv4(),
  };
  return await model.create(newAssignment);
};

export const findAllAssignments = async () => {
  return await model.find();
};

export const findAssignmentById = async (id) => {
  return await model.findById(id);
};

export const findAssignmentsByCourse = async (courseId) => {
  return await model.find({ course: courseId });
};

export const updateAssignment = async (id, assignment) => {
  return await model.findByIdAndUpdate(id, assignment, { new: true });
};

export const deleteAssignment = async (id) => {
  const result = await model.deleteOne({ _id: id });
  return result.deletedCount > 0;
};
