"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.updateUserValidator = [
    (0, express_validator_1.param)("id").isUUID(4).withMessage("Invalid user ID format"),
    (0, express_validator_1.body)("username")
        .optional()
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters long"),
    (0, express_validator_1.body)("email").optional().isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.body)("role")
        .optional()
        .isIn(["Student", "Professor", "Staff", "Admin"])
        .withMessage("Role must be one of 'student', 'professor', 'staff', or 'admin'"),
    reportErrors_1.handleValidationErrors,
];
