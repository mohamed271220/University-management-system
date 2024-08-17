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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHallsByDepartment = exports.getCoursesByDepartment = exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.getAllDepartments = exports.createDepartment = void 0;
const departmentService_1 = require("../services/departmentService");
const Department_1 = __importDefault(require("../models/Department"));
const departmentService = new departmentService_1.DepartmentService(Department_1.default);
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
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createDepartment = createDepartment;
const getAllDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getDepartmentById = getDepartmentById;
const updateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.updateDepartment = updateDepartment;
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.deleteDepartment = deleteDepartment;
const getCoursesByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getCoursesByDepartment = getCoursesByDepartment;
const getHallsByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getHallsByDepartment = getHallsByDepartment;
