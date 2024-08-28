"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLectureValidation = exports.createLectureValidation = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.createLectureValidation = [
    (0, express_validator_1.body)("courseId").isUUID().withMessage("Invalid course ID"),
    (0, express_validator_1.body)("professorId").isUUID().withMessage("Invalid professor ID"),
    (0, express_validator_1.body)("hallId").isUUID().withMessage("Invalid hall ID"),
    (0, express_validator_1.body)("dayOfWeek")
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
    (0, express_validator_1.body)("startTime")
        .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .withMessage("Invalid start time format"),
    (0, express_validator_1.body)("endTime")
        .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .withMessage("Invalid end time format"),
    (0, express_validator_1.body)("recurrencePattern")
        .optional()
        .isIn(["daily", "weekly", "monthly", "yearly"])
        .withMessage("Invalid recurrence pattern"),
    (0, express_validator_1.body)("recurrenceEndDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid recurrence end date"),
    reportErrors_1.handleValidationErrors,
];
exports.updateLectureValidation = [
    (0, express_validator_1.param)("lectureId").isUUID().withMessage("Invalid lecture ID"),
    (0, express_validator_1.body)("courseId").optional().isUUID().withMessage("Invalid course ID"),
    (0, express_validator_1.body)("professorId").optional().isUUID().withMessage("Invalid professor ID"),
    (0, express_validator_1.body)("hallId").optional().isUUID().withMessage("Invalid hall ID"),
    (0, express_validator_1.body)("dayOfWeek")
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
    (0, express_validator_1.body)("startTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .withMessage("Invalid start time format"),
    (0, express_validator_1.body)("endTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .withMessage("Invalid end time format"),
    (0, express_validator_1.body)("recurrencePattern")
        .optional()
        .isIn(["daily", "weekly", "monthly", "yearly"])
        .withMessage("Invalid recurrence pattern"),
    (0, express_validator_1.body)("recurrenceEndDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid recurrence end date"),
    reportErrors_1.handleValidationErrors,
];
