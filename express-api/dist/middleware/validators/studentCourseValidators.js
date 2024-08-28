"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentCourseValidation = exports.enrollCoursesValidation = void 0;
const express_validator_1 = require("express-validator");
const reportErrors_1 = require("./reportErrors");
exports.enrollCoursesValidation = [
    (0, express_validator_1.param)("studentId")
        .isUUID()
        .withMessage("Student ID must be a valid UUID")
        .notEmpty()
        .withMessage("Student ID is required"),
    (0, express_validator_1.body)("semesterId")
        .isUUID()
        .withMessage("Semester ID must be a valid UUID")
        .notEmpty()
        .withMessage("Semester ID is required"),
    (0, express_validator_1.body)("courses")
        .isArray({ min: 1 })
        .withMessage("Courses must be an array with at least one course ID")
        .custom((courses) => {
        for (const courseId of courses) {
            if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(courseId)) {
                throw new Error("All course IDs must be valid UUIDs");
            }
        }
        return true;
    }),
    reportErrors_1.handleValidationErrors,
];
exports.updateStudentCourseValidation = [
    (0, express_validator_1.param)("studentId")
        .isUUID()
        .withMessage("Student ID must be a valid UUID")
        .notEmpty()
        .withMessage("Student ID is required"),
    (0, express_validator_1.param)("courseId")
        .isUUID()
        .withMessage("Course ID must be a valid UUID")
        .notEmpty()
        .withMessage("Course ID is required"),
    (0, express_validator_1.body)("semesterId")
        .isUUID()
        .withMessage("Semester ID must be a valid UUID")
        .notEmpty()
        .withMessage("Semester ID is required"),
    reportErrors_1.handleValidationErrors,
];
