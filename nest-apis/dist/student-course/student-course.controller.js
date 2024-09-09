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
exports.StudentCourseController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const student_course_service_1 = require("./student-course.service");
const index_dto_1 = require("./dto/index.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_entity_1 = require("../user/user.entity");
let StudentCourseController = class StudentCourseController {
    constructor(studentCourseService) {
        this.studentCourseService = studentCourseService;
    }
    enrollStudentInCourse(studentId, createStudentCourseDto, user) {
        return this.studentCourseService.enrollStudentInCourse(studentId, createStudentCourseDto, user);
    }
    getStudentCourses(studentId, user) {
        return this.studentCourseService.getStudentCoursesByStudentId(studentId, user);
    }
    getCourseStudents(courseId, user) {
        return this.studentCourseService.getStudentsByCourseId(courseId, user);
    }
    getStudentCourse(studentId, courseId, user) {
        return this.studentCourseService.getStudentCourseById(studentId, courseId, user);
    }
    updateStudentCourse(studentId, courseId, updateStudentCourseDto, user) {
        return this.studentCourseService.updateStudentCourse(studentId, courseId, updateStudentCourseDto, user);
    }
    removeStudentFromCourse(studentId, courseId, user) {
        return this.studentCourseService.removeStudentFromCourse(studentId, courseId, user);
    }
};
exports.StudentCourseController = StudentCourseController;
__decorate([
    (0, common_1.Post)('enroll/:studentId/courses'),
    (0, roles_decorator_1.Roles)('Student', 'Admin'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, index_dto_1.CreateStudentCourseDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "enrollStudentInCourse", null);
__decorate([
    (0, common_1.Get)('students/:studentId/courses'),
    (0, roles_decorator_1.Roles)('Student', 'Admin', 'Staff'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "getStudentCourses", null);
__decorate([
    (0, common_1.Get)('courses/:courseId/students'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff', 'Professor'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "getCourseStudents", null);
__decorate([
    (0, common_1.Get)('students/:studentId/courses/:courseId'),
    (0, roles_decorator_1.Roles)('Professor', 'Admin', 'Staff'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "getStudentCourse", null);
__decorate([
    (0, common_1.Put)('students/:studentId/courses/:courseId/semester'),
    (0, roles_decorator_1.Roles)('Student', 'Admin'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, index_dto_1.UpdateStudentCourseDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "updateStudentCourse", null);
__decorate([
    (0, common_1.Delete)('students/:studentId/courses/:courseId'),
    (0, roles_decorator_1.Roles)('Student', 'Admin'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "removeStudentFromCourse", null);
exports.StudentCourseController = StudentCourseController = __decorate([
    (0, common_1.Controller)('api/v1/studentCourses'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [student_course_service_1.StudentCourseService])
], StudentCourseController);
//# sourceMappingURL=student-course.controller.js.map