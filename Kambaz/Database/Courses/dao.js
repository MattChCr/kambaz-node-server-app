import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
  function findAllCourses() {
    return db.courses;
  }
  function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = db;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses.push(newCourse);
    return newCourse;
  }
  function deleteCourse(courseId) {
    // Remove course in-place
    const courseIndex = db.courses.findIndex((course) => course._id === courseId);
    if (courseIndex !== -1) {
      db.courses.splice(courseIndex, 1);
    }
    // Remove all enrollments for this course in-place
    for (let i = db.enrollments.length - 1; i >= 0; i--) {
      if (db.enrollments[i].course === courseId) {
        db.enrollments.splice(i, 1);
      }
    }
    return { success: true };
  }

function updateCourse(courseId, courseUpdates) {
  const { courses } = db;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}

    
  return { findAllCourses, findCoursesForEnrolledUser, createCourse, updateCourse, deleteCourse  };
}
