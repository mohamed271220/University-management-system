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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentYearCoursesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const department_year_courses_service_1 = require("./department-year-courses.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_department_year_courses_dto_1 = require("./dto/create-department-year-courses.dto");
const update_department_year_courses_dto_1 = require("./dto/update-department-year-courses.dto");
let DepartmentYearCoursesController = class DepartmentYearCoursesController {
    constructor(departmentYearCoursesService) {
        this.departmentYearCoursesService = departmentYearCoursesService;
    }
    createDepartmentYearCourses(createDepartmentYearCoursesDto) {
        return this.departmentYearCoursesService.createDepartmentYearCourses(createDepartmentYearCoursesDto);
    }
    getAllDepartmentYearCourses() {
        return this.departmentYearCoursesService.getAllDepartmentYearCourses();
    }
    updateDepartmentYearCourses(departmentYearCourseId, updateDepartmentYearCoursesDto) {
        return this.departmentYearCoursesService.updateDepartmentYearCourses(departmentYearCourseId, updateDepartmentYearCoursesDto);
    }
    deleteDepartmentYearCourses(departmentYearCourseId) {
        return this.departmentYearCoursesService.deleteDepartmentYearCourses(departmentYearCourseId);
    }
};
exports.DepartmentYearCoursesController = DepartmentYearCoursesController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_year_courses_dto_1.CreateDepartmentYearCourseDto]),
    __metadata("design:returntype", void 0)
], DepartmentYearCoursesController.prototype, "createDepartmentYearCourses", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartmentYearCoursesController.prototype, "getAllDepartmentYearCourses", null);
__decorate([
    (0, common_1.Put)(':departmentYearCourseId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Param)('departmentYearCourseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_year_courses_dto_1.UpdateDepartmentYearCourseDto]),
    __metadata("design:returntype", void 0)
], DepartmentYearCoursesController.prototype, "updateDepartmentYearCourses", null);
__decorate([
    (0, common_1.Delete)(':departmentYearCourseId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Param)('departmentYearCourseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentYearCoursesController.prototype, "deleteDepartmentYearCourses", null);
exports.DepartmentYearCoursesController = DepartmentYearCoursesController = __decorate([
    (0, common_1.Controller)('api/v1/department-year-courses'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [department_year_courses_service_1.DepartmentYearCoursesService])
], DepartmentYearCoursesController);
//# sourceMappingURL=department-year-courses.controller.js.map