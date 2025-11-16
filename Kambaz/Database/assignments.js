import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

const ASSIGNMENTS_API = `${API_BASE}/api/assignments`;

export const createAssignment = async (assignment) => {
  const response = await axios.post(ASSIGNMENTS_API, assignment);
  return response.data;
};

export const findAllAssignments = async (courseId) => {
  const response = await axios.get(
    courseId ? `${ASSIGNMENTS_API}?course=${courseId}` : ASSIGNMENTS_API
  );
  return response.data;
};

export const findAssignmentById = async (id) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${id}`);
  return response.data;
};

export const updateAssignment = async (assignment) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (id) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
  return response.data;
};

