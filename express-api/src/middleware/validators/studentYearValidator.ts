import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateCreateStudentYear = [
  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isIn([
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year",
    ])
    .withMessage("Year must be 1st Year, 2nd Year, 3rd Year, or 4th Year"),

  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isUUID()
    .withMessage("Student ID must be a valid UUID"),

  body("effectiveDate")
    .notEmpty()
    .withMessage("Effective date is required")
    .isISO8601()
    .withMessage(
      "Effective date must be a valid date in the format YYYY-MM-DD"
    ),
  handleValidationErrors,
];

export const validateUpdateStudentYear = [
  param("studentYearId")
    .notEmpty()
    .withMessage("Student Year ID is required")
    .isUUID()
    .withMessage("Student Year ID must be a valid UUID"),

  body("year")
    .optional()
    .isIn([
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year",
    ])
    .withMessage("Year must be 1st Year, 2nd Year, 3rd Year, or 4th Year"),

  body("studentId")
    .optional()
    .isUUID()
    .withMessage("Student ID must be a valid UUID"),

  body("effectiveDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Effective date must be a valid date in the format YYYY-MM-DD"
    ),
  handleValidationErrors,
];
