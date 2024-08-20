import { body, param, query, validationResult } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const createLectureValidation = [
  body("courseId").isUUID().withMessage("Invalid course ID"),
  body("professorId").isUUID().withMessage("Invalid professor ID"),
  body("hallId").isUUID().withMessage("Invalid hall ID"),
  body("dayOfWeek")
    .isIn([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
    .withMessage("Invalid day of the week"),
  body("startTime")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Invalid start time format"),
  body("endTime")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Invalid end time format"),
  body("recurrencePattern")
    .optional()
    .isIn(["daily", "weekly", "monthly", "yearly"])
    .withMessage("Invalid recurrence pattern"),
  body("recurrenceEndDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid recurrence end date"),
  handleValidationErrors,
];

export const updateLectureValidation = [
  param("lectureId").isUUID().withMessage("Invalid lecture ID"),
  body("courseId").optional().isUUID().withMessage("Invalid course ID"),
  body("professorId").optional().isUUID().withMessage("Invalid professor ID"),
  body("hallId").optional().isUUID().withMessage("Invalid hall ID"),
  body("dayOfWeek")
    .optional()
    .isIn([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
    .withMessage("Invalid day of the week"),
  body("startTime")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Invalid start time format"),
  body("endTime")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Invalid end time format"),
  body("recurrencePattern")
    .optional()
    .isIn(["daily", "weekly", "monthly", "yearly"])
    .withMessage("Invalid recurrence pattern"),
  body("recurrenceEndDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid recurrence end date"),
  handleValidationErrors,
];
