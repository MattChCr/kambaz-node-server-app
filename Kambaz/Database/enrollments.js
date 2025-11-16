import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

const ENROLLMENTS_API = `${API_BASE}/api/enrollments`;

export const createEnrollment = async (enrollment) => {
  const response = await axios.post(ENROLLMENTS_API, enrollment);
  return response.data;
};

export const findAllEnrollments = async (filters = {}) => {
  const { user, course } = filters;
  let url = ENROLLMENTS_API;
  const params = new URLSearchParams();
  if (user) params.append("user", user);
  if (course) params.append("course", course);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const findEnrollmentById = async (id) => {
  const response = await axios.get(`${ENROLLMENTS_API}/${id}`);
  return response.data;
};

export const deleteEnrollment = async (id) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${id}`);
  return response.data;
};

export const unenroll = async (user, course) => {
  const response = await axios.post(`${ENROLLMENTS_API}/unenroll`, {
    user,
    course,
  });
  return response.data;
};

