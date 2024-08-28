import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";
export const createHallValidator = [
  body("name")
    .notEmpty()
    .withMessage("Hall name is required")
    .isString()
    .withMessage("Hall name must be a string"),

  body("isLab")
    .notEmpty()
    .withMessage("isLab is required")
    .isBoolean()
    .withMessage("isLab must be a boolean value"),

  body("departmentId")
    .notEmpty()
    .withMessage("Department ID is required")
    .isUUID(4)
    .withMessage("Department ID must be a valid UUID"),
  handleValidationErrors,
];

export const updateHallValidator = [
  param("hallId")
    .notEmpty()
    .withMessage("Hall ID is required")
    .isUUID(4)
    .withMessage("Hall ID must be a valid UUID"),

  body("name").optional().isString().withMessage("Hall name must be a string"),

  body("isLab")
    .optional()
    .isBoolean()
    .withMessage("isLab must be a boolean value"),

  body("departmentId")
    .optional()
    .isUUID(4)
    .withMessage("Department ID must be a valid UUID"),
  handleValidationErrors,
];
