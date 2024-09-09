"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_entity_1 = require("./department.entity");
const course_entity_1 = require("../course/course.entity");
const hall_entity_1 = require("../hall/hall.entity");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const uuid_1 = require("uuid");
let DepartmentService = class DepartmentService {
    constructor(departmentModel, courseModel, hallModel) {
        this.departmentModel = departmentModel;
        this.courseModel = courseModel;
        this.hallModel = hallModel;
    }
    createDepartment(createDepartmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, code } = createDepartmentDto;
            const existingDepartment = yield this.departmentModel.findOne({
                where: { [sequelize_2.Op.or]: [{ code }, { name }] },
            });
            if (existingDepartment) {
                throw new common_1.BadRequestException('Department already exists.');
            }
            const department = yield this.departmentModel.create(Object.assign({ id: (0, uuid_1.v4)() }, createDepartmentDto));
            return department;
        });
    }
    getAllDepartments() {
        return __awaiter(this, arguments, void 0, function* (search = '', limit = 10, offset = 0) {
            const { count, rows: departments } = yield this.departmentModel.findAndCountAll({
                raw: true,
                nest: true,
                where: {
                    [sequelize_2.Op.or]: [
                        { name: { [sequelize_2.Op.iLike]: `%${search}%` } },
                        { code: { [sequelize_2.Op.iLike]: `%${search}%` } },
                    ],
                },
                limit,
                offset,
            });
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
            if (!departments.length) {
                throw new common_1.NotFoundException('No departments found');
            }
            return { departments, pagination };
        });
    }
    getDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            return department;
        });
    }
    getDepartmentCourses(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(departmentId, {
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.courseModel,
                        as: 'courses',
                    },
                ],
            });
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            return department.courses;
        });
    }
    getDepartmentHalls(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            const halls = yield this.hallModel.findAll({
                where: { departmentId: departmentId },
                raw: true,
                nest: true,
            });
            if (!halls) {
                throw new common_1.NotFoundException('Halls not found');
            }
            return halls;
        });
    }
    updateDepartment(departmentId, updateDepartmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            const { name, code } = updateDepartmentDto;
            if (name) {
                department.name = name;
            }
            if (code) {
                department.code = code;
            }
            yield department.save();
            return department;
        });
    }
    deleteDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            yield department.destroy();
            return department;
        });
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __param(1, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(2, (0, sequelize_1.InjectModel)(hall_entity_1.Hall)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DepartmentService);
//# sourceMappingURL=department.service.js.map