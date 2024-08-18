"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = exports.validateProfile = void 0;
const express_validator_1 = require("express-validator");
exports.validateProfile = [
    (0, express_validator_1.body)("firstName").isString().notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").isString().notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("dob").isISO8601().withMessage("Date of birth must be a valid date"),
    (0, express_validator_1.body)("contactNumber")
        .isString()
        .isLength({ min: 10 })
        .withMessage("Contact number must be at least 10 characters long"),
    (0, express_validator_1.body)("address").isString().notEmpty().withMessage("Address is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.updateProfileValidation = [
    (0, express_validator_1.body)("firstName")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("First name must be a non-empty string"),
    (0, express_validator_1.body)("lastName")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Last name must be a non-empty string"),
    (0, express_validator_1.body)("dob")
        .optional()
        .isISO8601()
        .withMessage("Date of birth must be a valid date"),
    (0, express_validator_1.body)("contactNumber")
        .optional()
        .isString()
        .isLength({ min: 10 })
        .withMessage("Contact number must be at least 10 characters long"),
    (0, express_validator_1.body)("address")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Address must be a non-empty string"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
