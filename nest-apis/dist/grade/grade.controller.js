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
exports.GradeController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const grade_service_1 = require("./grade.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_grade_dto_1 = require("./dto/create-grade.dto");
const update_grade_dto_1 = require("./dto/update-grade.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../user/user.entity");
let GradeController = class GradeController {
    constructor(gradeService) {
        this.gradeService = gradeService;
    }
    createGrade(user, createGradeDto) {
        return this.gradeService.createGrade(user, createGradeDto);
    }
    getAllGrades(search, limit, offset) {
        return this.gradeService.getAllGrades(search, limit, offset);
    }
    getGrade(gradeId) {
        return this.gradeService.getGradeById(gradeId);
    }
    getGradesByStudent(studentId) {
        return this.gradeService.getGradesByStudent(studentId);
    }
    getGradesByStudentAndSemester(studentId, semesterId) {
        return this.gradeService.getGradesByStudentAndSemester(studentId, semesterId);
    }
    getGradesByCourse(courseId) {
        return this.gradeService.getGradesByCourse(courseId);
    }
    getGradesBySemester(semesterId) {
        return this.gradeService.getGradesBySemester(semesterId);
    }
    getGradesByProfessor(professorId) {
        return this.gradeService.getGradesByProfessor(professorId);
    }
    updateGrade(gradeId, updateGradeDto, user) {
        return this.gradeService.updateGrade(gradeId, updateGradeDto, user);
    }
    deleteGrade(gradeId) {
        return this.gradeService.deleteGrade(gradeId);
    }
};
exports.GradeController = GradeController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Professor', 'Admin'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_grade_dto_1.CreateGradeDTO]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "createGrade", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)('Staff', 'Admin'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getAllGrades", null);
__decorate([
    (0, common_1.Get)(':gradeId'),
    (0, roles_decorator_1.Roles)('Staff', 'Admin'),
    __param(0, (0, common_1.Param)('gradeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getGrade", null);
__decorate([
    (0, common_1.Get)('students/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getGradesByStudent", null);
__decorate([
    (0, common_1.Get)('students/:studentId/semesters/:semesterId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getGradesByStudentAndSemester", null);
__decorate([
    (0, common_1.Get)('courses/:courseId'),
    (0, roles_decorator_1.Roles)('Staff', 'Admin', 'Professor'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getGradesByCourse", null);
__decorate([
    (0, common_1.Get)('semesters/:semesterId'),
    (0, roles_decorator_1.Roles)('Staff', 'Admin'),
    __param(0, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getGradesBySemester", null);
__decorate([
    (0, common_1.Get)('professors/:professorId'),
    (0, roles_decorator_1.Roles)('Professor', 'Admin'),
    __param(0, (0, common_1.Param)('professorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "getGradesByProfessor", null);
__decorate([
    (0, common_1.Put)(':gradeId'),
    (0, roles_decorator_1.Roles)('Professor', 'Admin'),
    __param(0, (0, common_1.Param)('gradeId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_grade_dto_1.UpdateGradeDTO,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "updateGrade", null);
__decorate([
    (0, common_1.Delete)(':gradeId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Param)('gradeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "deleteGrade", null);
exports.GradeController = GradeController = __decorate([
    (0, common_1.Controller)('api/v1/grades'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [grade_service_1.GradeService])
], GradeController);
//# sourceMappingURL=grade.controller.js.map