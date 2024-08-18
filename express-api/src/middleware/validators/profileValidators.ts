import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateProfile = [
  body("firstName").isString().notEmpty().withMessage("First name is required"),
  body("lastName").isString().notEmpty().withMessage("Last name is required"),
  body("dob").isISO8601().withMessage("Date of birth must be a valid date"),
  body("contactNumber")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 characters long"),
  body("address").isString().notEmpty().withMessage("Address is required"),
  (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateProfileValidation = [
  body("firstName")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("First name must be a non-empty string"),
  body("lastName")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Last name must be a non-empty string"),
  body("dob")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
  body("contactNumber")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 characters long"),
  body("address")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Address must be a non-empty string"),
  (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
