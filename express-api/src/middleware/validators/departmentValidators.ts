import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

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
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
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
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
