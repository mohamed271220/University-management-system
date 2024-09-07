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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const course_service_1 = require("./course.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    createCourse(createCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }
    getAllCourses(search, limit, offset) {
        return this.courseService.getAllCourses(search, limit, offset);
    }
    getCourse(courseId) {
        return this.courseService.getCourseById(courseId);
    }
    getCourseLectures(courseId) {
        return this.courseService.getCourseLectures(courseId);
    }
    updateCourse(courseId, updateCourseDto) {
        return this.courseService.updateCourse(courseId, updateCourseDto);
    }
    deleteCourse(courseId) {
        return this.courseService.deleteCourse(courseId);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Get)(':courseId/lectures'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getCourseLectures", null);
__decorate([
    (0, common_1.Put)(':courseId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)(':courseId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('api/v1/courses'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map