import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const addCourseToDepartmentYearValidator = [
  body("departmentId")
    .isUUID()
    .withMessage("departmentId must be a valid UUID"),
  body("courseId").isUUID().withMessage("courseId must be a valid UUID"),
  body("year")
    .isIn(["1st Year", "2nd Year", "3rd Year", "4th Year"])
    .withMessage("Year must be 1st Year, 2nd Year, 3rd Year, or 4th Year"),

  handleValidationErrors,
];

export const getCoursesByDepartmentYearValidator = [
  body("departmentId")
    .isUUID()
    .withMessage("departmentId must be a valid UUID"),
  body("year")
    .isIn(["1st Year", "2nd Year", "3rd Year", "4th Year"])
    .withMessage("Year must be 1st Year, 2nd Year, 3rd Year, or 4th Year"),
  handleValidationErrors,
];

export const editCourseForDepartmentYearValidator = [
  param("id").isUUID().withMessage("id must be a valid UUID"),
  body("departmentId")
    .optional()
    .isUUID()
    .withMessage("departmentId must be a valid UUID"),
  body("courseId")
    .optional()
    .isUUID()
    .withMessage("courseId must be a valid UUID"),
  body("year")
    .optional()
    .isIn(["1st Year", "2nd Year", "3rd Year", "4th Year"])
    .withMessage("Year must be 1st Year, 2nd Year, 3rd Year, or 4th Year"),

  handleValidationErrors,
];

export const deleteCourseForDepartmentYearValidator = [
  param("id").isUUID().withMessage("id must be a valid UUID"),
  handleValidationErrors,
];
