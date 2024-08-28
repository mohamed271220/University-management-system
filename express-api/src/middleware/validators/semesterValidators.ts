import { body, param } from "express-validator";
import { validationResult } from "express-validator";
import { handleValidationErrors } from "./reportErrors";


export const validateCreateSemester = [
  body("name")
    .notEmpty()
    .withMessage("Semester name is required")
    .isString()
    .withMessage("Semester name must be a string"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after the start date");
      }
      return true;
    }),
  handleValidationErrors,
];

export const validateUpdateSemester = [
  param("semesterId")
    .notEmpty()
    .withMessage("Semester ID is required")
    .isUUID()
    .withMessage("Semester ID must be a valid UUID"),
  body("name")
    .optional()
    .isString()
    .withMessage("Semester name must be a string"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (
        req.body.startDate &&
        new Date(value) <= new Date(req.body.startDate)
      ) {
        throw new Error("End date must be after the start date");
      }
      return true;
    }),
  handleValidationErrors,
];
