import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const enrollCoursesValidation = [
  param("studentId")
    .isUUID()
    .withMessage("Student ID must be a valid UUID")
    .notEmpty()
    .withMessage("Student ID is required"),
  body("semesterId")
    .isUUID()
    .withMessage("Semester ID must be a valid UUID")
    .notEmpty()
    .withMessage("Semester ID is required"),
  body("courses")
    .isArray({ min: 1 })
    .withMessage("Courses must be an array with at least one course ID")
    .custom((courses) => {
      for (const courseId of courses) {
        if (
          !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
            courseId
          )
        ) {
          throw new Error("All course IDs must be valid UUIDs");
        }
      }
      return true;
    }),
  handleValidationErrors,
];

export const updateStudentCourseValidation = [
  param("studentId")
    .isUUID()
    .withMessage("Student ID must be a valid UUID")
    .notEmpty()
    .withMessage("Student ID is required"),
  param("courseId")
    .isUUID()
    .withMessage("Course ID must be a valid UUID")
    .notEmpty()
    .withMessage("Course ID is required"),
  body("semesterId")
    .isUUID()
    .withMessage("Semester ID must be a valid UUID")
    .notEmpty()
    .withMessage("Semester ID is required"),
  handleValidationErrors,
];
