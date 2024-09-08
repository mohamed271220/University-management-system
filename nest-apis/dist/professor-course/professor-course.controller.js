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
exports.ProfessorCourseController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const professor_course_service_1 = require("./professor-course.service");
const create_professor_course_dto_1 = require("./dto/create-professor-course.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
let ProfessorCourseController = class ProfessorCourseController {
    constructor(professorCourseService) {
        this.professorCourseService = professorCourseService;
    }
    createProfessorCourse(createProfessorCourseDto) {
        return this.professorCourseService.createProfessorCourse(createProfessorCourseDto);
    }
    getAllProfessorCourses() {
        return this.professorCourseService.getAllProfessorCourses();
    }
    getProfessorCourse(professorId, courseId) {
        return this.professorCourseService.getProfessorCourse(professorId, courseId);
    }
    getProfessorCourses(professorId) {
        return this.professorCourseService.getProfessorCourses(professorId);
    }
    getCourseProfessors(courseId) {
        return this.professorCourseService.getCourseProfessors(courseId);
    }
    deleteProfessorCourse(professorId, courseId) {
        return this.professorCourseService.deleteProfessorCourse(professorId, courseId);
    }
};
exports.ProfessorCourseController = ProfessorCourseController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_professor_course_dto_1.CreateProfessorCourseDto]),
    __metadata("design:returntype", void 0)
], ProfessorCourseController.prototype, "createProfessorCourse", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfessorCourseController.prototype, "getAllProfessorCourses", null);
__decorate([
    (0, common_1.Get)('professor/:professorId/course/:courseId'),
    __param(0, (0, common_1.Param)('professorId')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProfessorCourseController.prototype, "getProfessorCourse", null);
__decorate([
    (0, common_1.Get)('professors/:professorId/courses'),
    __param(0, (0, common_1.Param)('professorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfessorCourseController.prototype, "getProfessorCourses", null);
__decorate([
    (0, common_1.Get)('courses/:courseId/professors'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfessorCourseController.prototype, "getCourseProfessors", null);
__decorate([
    (0, common_1.Delete)('professor/:professorId/course/:courseId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('professorId')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProfessorCourseController.prototype, "deleteProfessorCourse", null);
exports.ProfessorCourseController = ProfessorCourseController = __decorate([
    (0, common_1.Controller)('api/v1/professor-course'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [professor_course_service_1.ProfessorCourseService])
], ProfessorCourseController);
//# sourceMappingURL=professor-course.controller.js.map