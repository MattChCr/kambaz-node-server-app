import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CoursesDao(db) {
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1 });
  }
  async function findCoursesForEnrolledUser(userId) {
    const courseIds = await enrollmentsDao.findCoursesForUser(userId);
    const courses = await model.find({ _id: { $in: courseIds } });
    return courses;
  }

  function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);

}
 function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

    
  return { findAllCourses, findCoursesForEnrolledUser, createCourse, updateCourse, deleteCourse  };
}
