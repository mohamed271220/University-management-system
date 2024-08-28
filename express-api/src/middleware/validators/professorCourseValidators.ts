import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createProfessorCourseValidation = [
  body("courseId")
    .isUUID()
    .withMessage("Course ID must be a valid UUID")
    .notEmpty()
    .withMessage("Course ID is required"),
  body("professorId")
    .isUUID()
    .withMessage("Professor ID must be a valid UUID")
    .notEmpty()
    .withMessage("Professor ID is required"),
  (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
