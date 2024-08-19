"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateSemester = exports.validateCreateSemester = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.validateCreateSemester = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Semester name is required")
        .isString()
        .withMessage("Semester name must be a string"),
    (0, express_validator_1.body)("startDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date must be a valid date"),
    (0, express_validator_1.body)("endDate")
        .notEmpty()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be a valid date")
        .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
            throw new Error("End date must be after the start date");
        }
        return true;
    }),
    reportErrors_1.handleValidationErrors,
];
exports.validateUpdateSemester = [
    (0, express_validator_1.param)("semesterId")
        .notEmpty()
        .withMessage("Semester ID is required")
        .isUUID()
        .withMessage("Semester ID must be a valid UUID"),
    (0, express_validator_1.body)("name")
        .optional()
        .isString()
        .withMessage("Semester name must be a string"),
    (0, express_validator_1.body)("startDate")
        .optional()
        .isISO8601()
        .withMessage("Start date must be a valid date"),
    (0, express_validator_1.body)("endDate")
        .optional()
        .isISO8601()
        .withMessage("End date must be a valid date")
        .custom((value, { req }) => {
        if (req.body.startDate &&
            new Date(value) <= new Date(req.body.startDate)) {
            throw new Error("End date must be after the start date");
        }
        return true;
    }),
    reportErrors_1.handleValidationErrors,
];
