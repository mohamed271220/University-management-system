"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateDepartment = exports.validateDepartment = void 0;
const express_validator_1 = require("express-validator");
exports.validateDepartment = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Department name must be a string")
        .notEmpty()
        .withMessage("Department name is required"),
    (0, express_validator_1.body)("code")
        .isString()
        .withMessage("Department code must be a string")
        .notEmpty()
        .withMessage("Department code is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateUpdateDepartment = [
    (0, express_validator_1.param)("id").isUUID().withMessage("Department ID must be a valid UUID"),
    (0, express_validator_1.body)("name")
        .optional()
        .isString()
        .withMessage("Department name must be a string"),
    (0, express_validator_1.body)("code")
        .optional()
        .isString()
        .withMessage("Department code must be a string"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
