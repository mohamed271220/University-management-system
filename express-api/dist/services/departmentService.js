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
exports.DepartmentService = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const Department_1 = __importDefault(require("../models/Department"));
const uuid_1 = require("uuid");
const Hall_1 = __importDefault(require("../models/Hall"));
const sequelize_1 = require("sequelize");
const CustomError_1 = require("../utils/CustomError");
class DepartmentService {
    constructor(departmentModel = Department_1.default) {
        this.departmentModel = departmentModel;
    }
    createDepartment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, code } = data;
            const exitingDepartment = yield this.departmentModel.findOne({
                where: { [sequelize_1.Op.or]: [{ code }, { name }] },
            });
            if (exitingDepartment)
                throw new CustomError_1.CustomError("Department already exists", 400);
            const department = yield this.departmentModel.create({
                id: (0, uuid_1.v4)(),
                name,
                code,
            });
            return department;
        });
    }
    getAllDepartments() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, offset = 0) {
            const { count, rows: departments } = yield this.departmentModel.findAndCountAll({
                limit,
                offset,
            });
            // count the number of departments for pagination
            const totalPages = Math.ceil(count / limit);
            const currentPage = Math.ceil(offset / limit) + 1;
            const hasNextPage = currentPage < totalPages;
            const hasPreviousPage = currentPage > 1;
            const pagination = {
                totalItems: count,
                itemsPerPage: limit,
                currentPage: currentPage,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage,
                nextPage: hasNextPage ? currentPage + 1 : null,
                previousPage: hasPreviousPage ? currentPage - 1 : null,
            };
            if (!departments)
                throw new CustomError_1.CustomError("Departments not found", 404);
            return { departments, pagination };
            // return departments;
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(id);
            if (!department)
                throw new CustomError_1.CustomError("Department not found", 404);
            return department;
        });
    }
    updateDepartment(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(id);
            if (!department)
                throw new CustomError_1.CustomError("Department not found", 404);
            const existingDepartment = yield this.departmentModel.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ code: updates.code || "" }, { name: updates.name || "" }],
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (existingDepartment) {
                if (existingDepartment.code === updates.code) {
                    throw new CustomError_1.CustomError("Department code already exists", 400);
                }
                if (existingDepartment.name === updates.name) {
                    throw new CustomError_1.CustomError("Department name already exists", 400);
                }
            }
            if (updates.name)
                department.name = updates.name;
            if (updates.code)
                department.code = updates.code;
            yield department.save();
            return department;
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(id);
            if (!department)
                throw new CustomError_1.CustomError("Department not found", 404);
            yield department.destroy();
        });
    }
    getCoursesByDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(id);
            if (!department)
                throw new CustomError_1.CustomError("Department not found", 404);
            const courses = yield Course_1.default.findAll({
                where: { departmentId: id },
            });
            if (!courses.length)
                throw new CustomError_1.CustomError("Department has no courses", 404);
            return courses;
        });
    }
    getHallsByDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentId = yield this.departmentModel.findByPk(id);
            if (!departmentId)
                throw new CustomError_1.CustomError("Department not found", 404);
            const department = yield Hall_1.default.findAll({
                where: { departmentId: id },
            });
            if (!department.length)
                throw new CustomError_1.CustomError("Department has no halls", 404);
            return department;
        });
    }
}
exports.DepartmentService = DepartmentService;
