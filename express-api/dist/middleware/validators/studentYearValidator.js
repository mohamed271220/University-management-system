"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateStudentYear = exports.validateCreateStudentYear = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.validateCreateStudentYear = [
    (0, express_validator_1.body)("year")
        .notEmpty()
        .withMessage("Year is required")
        .isInt({ min: 1 })
        .withMessage("Year must be a positive integer"),
    (0, express_validator_1.body)("studentId")
        .notEmpty()
        .withMessage("Student ID is required")
        .isUUID()
        .withMessage("Student ID must be a valid UUID"),
    (0, express_validator_1.body)("effectiveDate")
        .notEmpty()
        .withMessage("Effective date is required")
        .isISO8601()
        .withMessage("Effective date must be a valid date in the format YYYY-MM-DD"),
    reportErrors_1.handleValidationErrors,
];
exports.validateUpdateStudentYear = [
    (0, express_validator_1.param)("studentYearId")
        .notEmpty()
        .withMessage("Student Year ID is required")
        .isUUID()
        .withMessage("Student Year ID must be a valid UUID"),
    (0, express_validator_1.body)("year")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Year must be a positive integer"),
    (0, express_validator_1.body)("studentId")
        .optional()
        .isUUID()
        .withMessage("Student ID must be a valid UUID"),
    (0, express_validator_1.body)("effectiveDate")
        .optional()
        .isISO8601()
        .withMessage("Effective date must be a valid date in the format YYYY-MM-DD"),
    reportErrors_1.handleValidationErrors,
];
