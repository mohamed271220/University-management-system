"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const departmentYearCoursesController = __importStar(require("../controllers/departmentYearCourse"));
const departmentYearCoursesValidator_1 = require("../middleware/validators/departmentYearCoursesValidator");
const router = (0, express_1.Router)();
// /api/v1/departmentYearCourses
// add course to department specific year
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin"), departmentYearCoursesValidator_1.addCourseToDepartmentYearValidator, departmentYearCoursesController.addCourseToDepartmentYear);
// get all courses for a department specific year
router.get("/", authMiddleware_1.authenticateToken, departmentYearCoursesValidator_1.getCoursesByDepartmentYearValidator, departmentYearCoursesController.getCoursesByDepartmentYear);
// edit course for a department specific year
router.put("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin"), departmentYearCoursesValidator_1.editCourseForDepartmentYearValidator, departmentYearCoursesController.editCourseForDepartmentYear);
// delete course for a department specific year
router.delete("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin"), departmentYearCoursesValidator_1.deleteCourseForDepartmentYearValidator, departmentYearCoursesController.deleteCourseForDepartmentYear);
exports.default = router;
