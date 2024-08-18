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
const departmentService = new departmentService_1.DepartmentService();
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield departmentService.createDepartment(req.body);
        if (!department) {
            return res.status(400).json({ message: "Department creation failed" });
        }
        res
            .status(201)
            .json({ message: "Department created successfully", department });
    }
    catch (error) {
        if (error.message === "Department already exists") {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createDepartment = createDepartment;
const getAllDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield departmentService.getDepartmentById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Department found", department });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDepartmentById = getDepartmentById;
const updateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDepartment = yield departmentService.updateDepartment(req.params.id, req.body);
        res.status(200).json({ message: "Department updated", updatedDepartment });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateDepartment = updateDepartment;
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDepartment = yield departmentService.deleteDepartment(req.params.id);
        res.status(200).json({ message: "Department deleted", deletedDepartment });
    }
    catch (error) {
        if (error.message === "Department not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteDepartment = deleteDepartment;
const getCoursesByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.id;
        if (!departmentId) {
            return res.status(400).json({ message: "Department ID is required" });
        }
        const courses = yield departmentService.getCoursesByDepartment(departmentId);
        res.status(200).json({ message: "Courses found", courses });
    }
    catch (error) {
        if (error.message === "Department has no courses") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCoursesByDepartment = getCoursesByDepartment;
const getHallsByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.id;
        if (!departmentId) {
            return res.status(400).json({ message: "Department ID is required" });
        }
        const halls = yield departmentService.getHallsByDepartment(departmentId);
        res.status(200).json({ message: "Halls found", halls });
    }
    catch (error) {
        if (error.message === "Department has no halls") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getHallsByDepartment = getHallsByDepartment;
