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
exports.CourseCacheController = void 0;
const common_1 = require("@nestjs/common");
const course_cache_service_1 = require("./course-cache.service");
const dto_1 = require("./dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const role_guard_1 = require("../auth/role.guard");
const passport_1 = require("@nestjs/passport");
let CourseCacheController = class CourseCacheController {
    constructor(courseCacheService) {
        this.courseCacheService = courseCacheService;
    }
    create(createCourseCacheDto) {
        return this.courseCacheService.create(createCourseCacheDto);
    }
    findAll() {
        return this.courseCacheService.findAll();
    }
    findOne(courseId) {
        return this.courseCacheService.findOne(courseId);
    }
    update(courseId, updateCourseCacheDto) {
        return this.courseCacheService.update(courseId, updateCourseCacheDto);
    }
    remove(courseId) {
        return this.courseCacheService.remove(courseId);
    }
};
exports.CourseCacheController = CourseCacheController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCourseCacheDto]),
    __metadata("design:returntype", Promise)
], CourseCacheController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseCacheController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':courseId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseCacheController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':courseId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCourseCacheDto]),
    __metadata("design:returntype", Promise)
], CourseCacheController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':courseId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseCacheController.prototype, "remove", null);
exports.CourseCacheController = CourseCacheController = __decorate([
    (0, common_1.Controller)('course-cache'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [course_cache_service_1.CourseCacheService])
], CourseCacheController);
//# sourceMappingURL=course-cache.controller.js.map