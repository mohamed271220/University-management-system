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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentYearController = void 0;
const common_1 = require("@nestjs/common");
const student_year_service_1 = require("./student-year.service");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_student_year_dto_1 = require("./dto/create-student-year.dto");
const update_student_year_dto_1 = require("./dto/update-student-year.dto");
let StudentYearController = class StudentYearController {
    constructor(studentYearService) {
        this.studentYearService = studentYearService;
    }
    createStudentYear(createStudentYearDto) {
        return this.studentYearService.createStudentYear(createStudentYearDto);
    }
    getAllStudentYears() {
        return this.studentYearService.getAllStudentYears();
    }
    getStudentYearsByStudentId(studentId) {
        return this.studentYearService.getStudentYearsByStudentId(studentId);
    }
    updateStudentYear(studentYearId, updateStudentYearDto) {
        return this.studentYearService.updateStudentYear(studentYearId, updateStudentYearDto);
    }
    deleteStudentYear(studentYearId) {
        return this.studentYearService.deleteStudentYear(studentYearId);
    }
};
exports.StudentYearController = StudentYearController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_year_dto_1.CreateStudentYearDto]),
    __metadata("design:returntype", void 0)
], StudentYearController.prototype, "createStudentYear", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentYearController.prototype, "getAllStudentYears", null);
__decorate([
    (0, common_1.Get)('students/:studentId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentYearController.prototype, "getStudentYearsByStudentId", null);
__decorate([
    (0, common_1.Put)(':studentYearId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_year_dto_1.UpdateStudentYearDto]),
    __metadata("design:returntype", void 0)
], StudentYearController.prototype, "updateStudentYear", null);
__decorate([
    (0, common_1.Delete)(':studentYearId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentYearController.prototype, "deleteStudentYear", null);
exports.StudentYearController = StudentYearController = __decorate([
    (0, common_1.Controller)('api/v1/studentYears'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [student_year_service_1.StudentYearService])
], StudentYearController);
//# sourceMappingURL=student-year.controller.js.map