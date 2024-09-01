"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseForDepartmentYear = exports.editCourseForDepartmentYear = exports.getCoursesByDepartmentYear = exports.addCourseToDepartmentYear = void 0;
const departmentYearCoursesService_1 = require("../services/departmentYearCoursesService");
const departmentYearCoursesService = new departmentYearCoursesService_1.DepartmentYearCoursesService();
const addCourseToDepartmentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentId, courseId, year } = req.body;
        const course = yield departmentYearCoursesService.addCourseToDepartmentYear(departmentId, courseId, year);
        res.status(201).json({
            success: true,
            message: "Course added to department specific year",
            data: course,
        });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.addCourseToDepartmentYear = addCourseToDepartmentYear;
const getCoursesByDepartmentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentId, year } = req.body;
        const courses = yield departmentYearCoursesService.getCoursesByDepartmentYear(departmentId, year);
        res.status(200).json({
            success: true,
            message: "Courses found for department specific year",
            data: courses,
        });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.getCoursesByDepartmentYear = getCoursesByDepartmentYear;
const editCourseForDepartmentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { departmentId, courseId, year } = req.body;
        const course = yield departmentYearCoursesService.editCourseForDepartmentYear(id, departmentId, courseId, year);
        res.status(200).json({
            success: true,
            message: "Course edited for department specific year",
            course,
        });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.editCourseForDepartmentYear = editCourseForDepartmentYear;
const deleteCourseForDepartmentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield departmentYearCoursesService.deleteCourseForDepartmentYear(id);
        res.status(200).json({
            success: true,
            message: "Course deleted for department specific year",
        });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.deleteCourseForDepartmentYear = deleteCourseForDepartmentYear;
