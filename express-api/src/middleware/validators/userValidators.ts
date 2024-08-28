import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { handleValidationErrors } from "./reportErrors";

export const updateUserValidator = [
  param("id").isUUID(4).withMessage("Invalid user ID format"),

  body("username")
    .optional()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters long"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("role")
    .optional()
    .isIn(["Student", "Professor", "Staff", "Admin"])
    .withMessage(
      "Role must be one of 'student', 'professor', 'staff', or 'admin'"
    ),
  handleValidationErrors,
];
