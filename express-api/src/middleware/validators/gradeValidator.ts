import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const createGradeValidation = [
  body("studentId").isUUID().withMessage("Student ID must be a valid UUID"),
  body("courseId").isUUID().withMessage("Course ID must be a valid UUID"),
  body("semesterId").isUUID().withMessage("Semester ID must be a valid UUID"),
  body("grade").isString().notEmpty().withMessage("Grade is required"),
  body("date")
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid ISO 8601 date"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  handleValidationErrors,
];

export const updateGradeValidation = [
  param("id").isUUID().withMessage("Grade ID must be a valid UUID"),
  body("studentId")
    .optional()
    .isUUID()
    .withMessage("Student ID must be a valid UUID"),
  body("courseId")
    .optional()
    .isUUID()
    .withMessage("Course ID must be a valid UUID"),
  body("semesterId")
    .optional()
    .isUUID()
    .withMessage("Semester ID must be a valid UUID"),
  body("grade")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Grade must be a string"),
  body("date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid ISO 8601 date"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  handleValidationErrors,
];

export const getGradeByIdValidation = [
  param("id").isUUID().withMessage("Grade ID must be a valid UUID"),
  handleValidationErrors,
];
