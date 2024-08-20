"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHallValidator = exports.createHallValidator = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.createHallValidator = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Hall name is required")
        .isString()
        .withMessage("Hall name must be a string"),
    (0, express_validator_1.body)("isLab")
        .notEmpty()
        .withMessage("isLab is required")
        .isBoolean()
        .withMessage("isLab must be a boolean value"),
    (0, express_validator_1.body)("departmentId")
        .notEmpty()
        .withMessage("Department ID is required")
        .isUUID(4)
        .withMessage("Department ID must be a valid UUID"),
    reportErrors_1.handleValidationErrors,
];
exports.updateHallValidator = [
    (0, express_validator_1.param)("hallId")
        .notEmpty()
        .withMessage("Hall ID is required")
        .isUUID(4)
        .withMessage("Hall ID must be a valid UUID"),
    (0, express_validator_1.body)("name").optional().isString().withMessage("Hall name must be a string"),
    (0, express_validator_1.body)("isLab")
        .optional()
        .isBoolean()
        .withMessage("isLab must be a boolean value"),
    (0, express_validator_1.body)("departmentId")
        .optional()
        .isUUID(4)
        .withMessage("Department ID must be a valid UUID"),
    reportErrors_1.handleValidationErrors,
];
