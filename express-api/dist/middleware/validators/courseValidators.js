"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateCourse = exports.validateCourse = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.validateCourse = [
    (0, express_validator_1.body)("code")
        .isString()
        .withMessage("Course code must be a string")
        .notEmpty()
        .withMessage("Course code cannot be empty"),
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Course name must be a string")
        .notEmpty()
        .withMessage("Course name cannot be empty"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    (0, express_validator_1.body)("credits")
        .isInt({ gt: 0 })
        .withMessage("Credits must be a positive integer"),
    (0, express_validator_1.body)("departmentId")
        .isUUID()
        .withMessage("Department ID must be a valid UUID"),
    (0, express_validator_1.body)("professorId").isUUID().withMessage("Professor ID must be a valid UUID"),
    reportErrors_1.handleValidationErrors,
];
exports.validateUpdateCourse = [
    (0, express_validator_1.param)("semesterId").isUUID().withMessage("Course ID must be a valid UUID"),
    (0, express_validator_1.body)("code")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Course code must be a string"),
    (0, express_validator_1.body)("name")
        .optional()
        .isString()
        .withMessage("Course name must be a string"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    (0, express_validator_1.body)("credits")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Credits must be a positive integer"),
    (0, express_validator_1.body)("departmentId")
        .optional()
        .isUUID()
        .withMessage("Department ID must be a valid UUID"),
    (0, express_validator_1.body)("professorId")
        .optional()
        .isUUID()
        .withMessage("Professor ID must be a valid UUID"),
    reportErrors_1.handleValidationErrors,
];
