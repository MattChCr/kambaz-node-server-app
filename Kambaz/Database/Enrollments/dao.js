import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId });
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId });
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(userId, courseId) {
  const existing = await model.findOne({ user: userId, course: courseId });
  if (existing) {
    return existing;
  }
  return model.create({
    user: userId,
    course: courseId,
    _id: `${userId}-${courseId}`,
  });
}

export async function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function unenrollAllUsersFromCourse(courseId) {
  return model.deleteMany({ course: courseId });
}

export async function findAllEnrollments() {
  return model.find();
}

export async function findEnrollmentById(id) {
  return model.findById(id);
}

export async function findEnrollmentByUserAndCourse(user, course) {
  return model.findOne({ user, course });
}

export async function findEnrollmentsByUser(user) {
  return model.find({ user });
}

export async function findEnrollmentsByCourse(course) {
  return model.find({ course });
}

export async function createEnrollment(enrollment) {
  const newEnrollment = {
    ...enrollment,
    _id: enrollment._id || `${enrollment.user}-${enrollment.course}`,
  };
  return model.create(newEnrollment);
}

export async function deleteEnrollment(id) {
  const result = await model.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

export async function deleteEnrollmentByUserAndCourse(user, course) {
  const result = await model.deleteOne({ user, course });
  return result.deletedCount > 0;
}
