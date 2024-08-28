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
exports.getHallsByDepartment = exports.getCoursesByDepartment = exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.getAllDepartments = exports.createDepartment = void 0;
const departmentService_1 = require("../services/departmentService");
const CustomError_1 = require("../utils/CustomError");
const departmentService = new departmentService_1.DepartmentService();
const createDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield departmentService.createDepartment(req.body);
        if (!department) {
            throw new CustomError_1.CustomError("Failed to create department", 500);
        }
        res
            .status(201)
            .json({ message: "Department created successfully", department });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createDepartment = createDepartment;
const getAllDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const { departments, pagination } = yield departmentService.getAllDepartments(limit, offset);
        res.status(200).json({
            message: "All departments",
            departments,
            pagination,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield departmentService.getDepartmentById(req.params.id);
        if (!department) {
            throw new CustomError_1.CustomError("Department not found", 404);
        }
        res.status(200).json({ message: "Department found", department });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getDepartmentById = getDepartmentById;
const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDepartment = yield departmentService.updateDepartment(req.params.id, req.body);
        res.status(200).json({ message: "Department updated", updatedDepartment });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateDepartment = updateDepartment;
const deleteDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDepartment = yield departmentService.deleteDepartment(req.params.id);
        res.status(200).json({ message: "Department deleted", deletedDepartment });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteDepartment = deleteDepartment;
const getCoursesByDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.id;
        if (!departmentId) {
            throw new CustomError_1.CustomError("Department ID is required", 400);
        }
        const courses = yield departmentService.getCoursesByDepartment(departmentId);
        res.status(200).json({ message: "Courses found", courses });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getCoursesByDepartment = getCoursesByDepartment;
const getHallsByDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.id;
        if (!departmentId) {
            throw new CustomError_1.CustomError("Department ID is required", 400);
        }
        const halls = yield departmentService.getHallsByDepartment(departmentId);
        res.status(200).json({ message: "Halls found", halls });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getHallsByDepartment = getHallsByDepartment;
