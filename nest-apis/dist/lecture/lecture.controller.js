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
exports.LectureController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const lecture_service_1 = require("./lecture.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_lecture_dto_1 = require("./dto/create-lecture.dto");
const update_lecture_dto_1 = require("./dto/update-lecture.dto");
let LectureController = class LectureController {
    constructor(lectureService) {
        this.lectureService = lectureService;
    }
    createLecture(createLectureDto) {
        return this.lectureService.createLecture(createLectureDto);
    }
    getAllLectures(search, limit, offset) {
        return this.lectureService.getAllLectures();
    }
    getLecture(lectureId) {
        return this.lectureService.getLectureById(lectureId);
    }
    getLectureAttendance(lectureId) {
        return this.lectureService.getLectureAttendance(lectureId);
    }
    getLectureArchived(lectureId) {
        return this.lectureService.getLectureArchived(lectureId);
    }
    updateLecture(lectureId, updateLectureDto) {
        return this.lectureService.updateLecture(lectureId, updateLectureDto);
    }
    deleteLecture(lectureId) {
        return this.lectureService.deleteLecture(lectureId);
    }
};
exports.LectureController = LectureController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Professor', 'Admin', 'Staff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lecture_dto_1.CreateLectureDTO]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "createLecture", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "getAllLectures", null);
__decorate([
    (0, common_1.Get)(':lectureId'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "getLecture", null);
__decorate([
    (0, common_1.Get)(':lectureId/attendance'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "getLectureAttendance", null);
__decorate([
    (0, common_1.Get)(':lectureId/archived'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "getLectureArchived", null);
__decorate([
    (0, common_1.Put)(':lectureId'),
    (0, roles_decorator_1.Roles)('Professor', 'Admin', 'Staff'),
    __param(0, (0, common_1.Param)('lectureId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lecture_dto_1.UpdateLectureDTO]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "updateLecture", null);
__decorate([
    (0, common_1.Delete)(':lectureId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LectureController.prototype, "deleteLecture", null);
exports.LectureController = LectureController = __decorate([
    (0, common_1.Controller)('api/v1/lectures'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [lecture_service_1.LectureService])
], LectureController);
//# sourceMappingURL=lecture.controller.js.map