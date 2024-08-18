import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
export const validateCourse = [
  body("code")
    .isString()
    .withMessage("Course code must be a string")
    .notEmpty()
    .withMessage("Course code cannot be empty"),

  body("name")
    .isString()
    .withMessage("Course name must be a string")
    .notEmpty()
    .withMessage("Course name cannot be empty"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("credits")
    .isInt({ gt: 0 })
    .withMessage("Credits must be a positive integer"),

  body("departmentId")
    .isUUID()
    .withMessage("Department ID must be a valid UUID"),

  body("professorId").isUUID().withMessage("Professor ID must be a valid UUID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateCourse = [
  param("id").isUUID().withMessage("Course ID must be a valid UUID"),

  body("code")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Course code must be a string"),

  body("name")
    .optional()
    .isString()
    .withMessage("Course name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("credits")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Credits must be a positive integer"),

  body("departmentId")
    .optional()
    .isUUID()
    .withMessage("Department ID must be a valid UUID"),

  body("professorId")
    .optional()
    .isUUID()
    .withMessage("Professor ID must be a valid UUID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
