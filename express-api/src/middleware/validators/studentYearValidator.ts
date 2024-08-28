import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateCreateStudentYear = [
  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isInt({ min: 1 })
    .withMessage("Year must be a positive integer"),

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
    .isInt({ min: 1 })
    .withMessage("Year must be a positive integer"),

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
