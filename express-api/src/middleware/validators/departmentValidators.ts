import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateDepartment = [
  body("name")
    .isString()
    .withMessage("Department name must be a string")
    .notEmpty()
    .withMessage("Department name is required"),

  body("code")
    .isString()
    .withMessage("Department code must be a string")
    .notEmpty()
    .withMessage("Department code is required"),
  handleValidationErrors,
];

export const validateUpdateDepartment = [
  param("id").isUUID().withMessage("Department ID must be a valid UUID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Department name must be a string"),

  body("code")
    .optional()
    .isString()
    .withMessage("Department code must be a string"),
  handleValidationErrors,
];
