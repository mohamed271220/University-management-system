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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const department_service_1 = require("./department.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    createDepartment(createDepartmentDto) {
        return this.departmentService.createDepartment(createDepartmentDto);
    }
    getAllDepartments(search, limit, offset) {
        return this.departmentService.getAllDepartments(search, limit, offset);
    }
    getDepartment(departmentId) {
        return this.departmentService.getDepartment(departmentId);
    }
    getDepartmentCourses(departmentId) {
        return this.departmentService.getDepartmentCourses(departmentId);
    }
    getDepartmentHalls(departmentId) {
        return this.departmentService.getDepartmentHalls(departmentId);
    }
    updateDepartment(departmentId, updateDepartmentDto) {
        return this.departmentService.updateDepartment(departmentId, updateDepartmentDto);
    }
    deleteDepartment(departmentId) {
        return this.departmentService.deleteDepartment(departmentId);
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDTO]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getAllDepartments", null);
__decorate([
    (0, common_1.Get)(':departmentId'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartment", null);
__decorate([
    (0, common_1.Get)(':departmentId/courses'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentCourses", null);
__decorate([
    (0, common_1.Get)(':departmentId/halls'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentHalls", null);
__decorate([
    (0, common_1.Put)(':departmentId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDTO]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Delete)(':departmentId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "deleteDepartment", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.Controller)('api/v1/departments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map