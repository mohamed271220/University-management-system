"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfessorCourseValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createProfessorCourseValidation = [
    (0, express_validator_1.body)("courseId")
        .isUUID()
        .withMessage("Course ID must be a valid UUID")
        .notEmpty()
        .withMessage("Course ID is required"),
    (0, express_validator_1.body)("professorId")
        .isUUID()
        .withMessage("Professor ID must be a valid UUID")
        .notEmpty()
        .withMessage("Professor ID is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
