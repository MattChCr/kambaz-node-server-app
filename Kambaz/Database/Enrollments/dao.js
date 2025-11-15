import { v4 as uuidv4 } from "uuid";

let enrollments = [];

export const createEnrollment = (enrollment) => {
  const newEnrollment = {
    ...enrollment,
    _id: uuidv4(),
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

export const findAllEnrollments = () => enrollments;

export const findEnrollmentById = (id) => {
  return enrollments.find((enrollment) => enrollment._id === id);
};

export const findEnrollmentsByUser = (userId) => {
  return enrollments.filter((enrollment) => enrollment.user === userId);
};

export const findEnrollmentsByCourse = (courseId) => {
  return enrollments.filter((enrollment) => enrollment.course === courseId);
};

export const findEnrollmentByUserAndCourse = (userId, courseId) => {
  return enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
};

export const deleteEnrollment = (id) => {
  const index = enrollments.findIndex((e) => e._id === id);
  if (index === -1) {
    return false;
  }
  enrollments.splice(index, 1);
  return true;
};

export const deleteEnrollmentByUserAndCourse = (userId, courseId) => {
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index === -1) {
    return false;
  }
  enrollments.splice(index, 1);
  return true;
};

