import { v4 as uuidv4 } from "uuid";
import db from "../index.js";

export const createEnrollment = (enrollment) => {
  const newEnrollment = {
    ...enrollment,
    _id: uuidv4(),
  };
  db.enrollments.push(newEnrollment);
  return newEnrollment;
};

export const findAllEnrollments = () => db.enrollments;

export const findEnrollmentById = (id) => {
  return db.enrollments.find((enrollment) => enrollment._id === id);
};

export const findEnrollmentsByUser = (userId) => {
  return db.enrollments.filter((enrollment) => enrollment.user === userId);
};

export const findEnrollmentsByCourse = (courseId) => {
  return db.enrollments.filter((enrollment) => enrollment.course === courseId);
};

export const findEnrollmentByUserAndCourse = (userId, courseId) => {
  return db.enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
};

export const deleteEnrollment = (id) => {
  const index = db.enrollments.findIndex((e) => e._id === id);
  if (index === -1) {
    return false;
  }
  db.enrollments.splice(index, 1);
  return true;
};

export const deleteEnrollmentByUserAndCourse = (userId, courseId) => {
  const index = db.enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index === -1) {
    return false;
  }
  db.enrollments.splice(index, 1);
  return true;
};

// Factory function for backward compatibility with Courses/routes.js
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId
    };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }
  return { enrollUserInCourse };
}
