"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.validateSignup = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 12 })
        .withMessage("Password must be at least 12 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&#]/)
        .withMessage("Password must contain at least one special character (@$!%*?&#)"),
    reportErrors_1.handleValidationErrors,
];
exports.validateLogin = [
    (0, express_validator_1.body)("email")
        .if((0, express_validator_1.body)("username").not().exists())
        .notEmpty()
        .withMessage("Email is required if username is not provided")
        .isEmail()
        .withMessage("Invalid email format"),
    (0, express_validator_1.body)("username")
        .if((0, express_validator_1.body)("email").not().exists())
        .notEmpty()
        .withMessage("Username is required if email is not provided"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    reportErrors_1.handleValidationErrors,
];
