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
exports.DepartmentYearCoursesService = void 0;
const common_1 = require("@nestjs/common");
const course_entity_1 = require("../course/course.entity");
const department_entity_1 = require("../department/department.entity");
const sequelize_1 = require("@nestjs/sequelize");
const department_year_courses_entity_1 = require("./department-year-courses.entity");
const uuid_1 = require("uuid");
let DepartmentYearCoursesService = class DepartmentYearCoursesService {
    constructor(departmentModel, courseModel, departmentYearCoursesModel) {
        this.departmentModel = departmentModel;
        this.courseModel = courseModel;
        this.departmentYearCoursesModel = departmentYearCoursesModel;
    }
    createDepartmentYearCourses(createDepartmentYearCoursesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { departmentId, courseId } = createDepartmentYearCoursesDto;
            const [department, course] = yield Promise.all([
                this.departmentModel.findByPk(departmentId),
                this.courseModel.findByPk(courseId),
            ]);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            try {
                const departmentYearCourse = yield this.departmentYearCoursesModel.create(Object.assign({ id: (0, uuid_1.v4)() }, createDepartmentYearCoursesDto));
                return departmentYearCourse;
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    throw new common_1.BadRequestException('Department year course already exists');
                }
                common_1.Logger.error(e);
                throw new common_1.BadRequestException('Could not create department year course');
            }
        });
    }
    getAllDepartmentYearCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentYearCourses = yield this.departmentYearCoursesModel.findAll({
                raw: true,
            });
            return departmentYearCourses;
        });
    }
    updateDepartmentYearCourses(departmentYearCourseId, updateDepartmentYearCoursesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentYearCourse = yield this.departmentYearCoursesModel.findByPk(departmentYearCourseId);
            if (!departmentYearCourse) {
                throw new common_1.NotFoundException('Department year course not found');
            }
            yield departmentYearCourse.update(updateDepartmentYearCoursesDto);
            return departmentYearCourse;
        });
    }
    deleteDepartmentYearCourses(departmentYearCourseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentYearCourse = yield this.departmentYearCoursesModel.findByPk(departmentYearCourseId);
            if (!departmentYearCourse) {
                throw new common_1.NotFoundException('Department year course not found');
            }
            yield departmentYearCourse.destroy();
            return departmentYearCourseId;
        });
    }
};
exports.DepartmentYearCoursesService = DepartmentYearCoursesService;
exports.DepartmentYearCoursesService = DepartmentYearCoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __param(1, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(2, (0, sequelize_1.InjectModel)(department_year_courses_entity_1.DepartmentYearCourses)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DepartmentYearCoursesService);
//# sourceMappingURL=department-year-courses.service.js.map