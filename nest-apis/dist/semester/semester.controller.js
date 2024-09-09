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
exports.SemesterController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const semester_service_1 = require("./semester.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_semester_dto_1 = require("./dto/create-semester.dto");
const update_semester_dto_1 = require("./dto/update-semester.dto");
let SemesterController = class SemesterController {
    constructor(semesterService) {
        this.semesterService = semesterService;
    }
    createSemester(createSemesterDto) {
        return this.semesterService.createSemester(createSemesterDto);
    }
    getAllSemesters() {
        return this.semesterService.getAllSemesters();
    }
    getSemester(semesterId) {
        return this.semesterService.getSemester(semesterId);
    }
    getSemesterGrades(semesterId) {
        return this.semesterService.getSemesterGrades(semesterId);
    }
    getStudentEnrolledCourses(semesterId) {
        return this.semesterService.getStudentEnrolledCourses(semesterId);
    }
    updateSemester(semesterId, updateSemesterDto) {
        return this.semesterService.updateSemester(semesterId, updateSemesterDto);
    }
    deleteSemester(semesterId) {
        return this.semesterService.deleteSemester(semesterId);
    }
};
exports.SemesterController = SemesterController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_semester_dto_1.CreateSemesterDto]),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "createSemester", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "getAllSemesters", null);
__decorate([
    (0, common_1.Get)(':semesterId'),
    __param(0, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "getSemester", null);
__decorate([
    (0, common_1.Get)(':semesterId/grades'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "getSemesterGrades", null);
__decorate([
    (0, common_1.Get)(':semesterId/student-courses'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "getStudentEnrolledCourses", null);
__decorate([
    (0, common_1.Put)(':semesterId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_semester_dto_1.UpdateSemesterDto]),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "updateSemester", null);
__decorate([
    (0, common_1.Delete)(':semesterId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SemesterController.prototype, "deleteSemester", null);
exports.SemesterController = SemesterController = __decorate([
    (0, common_1.Controller)('api/v1/semesters'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [semester_service_1.SemesterService])
], SemesterController);
//# sourceMappingURL=semester.controller.js.map