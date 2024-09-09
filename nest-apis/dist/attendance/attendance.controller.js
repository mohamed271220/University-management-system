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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const attendance_service_1 = require("./attendance.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../user/user.entity");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    createAttendance(createAttendanceDto, user) {
        return this.attendanceService.createAttendance(createAttendanceDto, user);
    }
    getAllAttendance(limit, offset) {
        return this.attendanceService.getAllAttendance(limit, offset);
    }
    getAttendance(attendanceId) {
        return this.attendanceService.getAttendance(attendanceId);
    }
    getStudentAttendance(studentId, user) {
        return this.attendanceService.getStudentAttendance(studentId, user);
    }
    getLectureAttendance(lectureId) {
        return this.attendanceService.getLectureAttendance(lectureId);
    }
    getLectureStudentAttendance(lectureId, studentId) {
        return this.attendanceService.getLectureStudentAttendance(lectureId, studentId);
    }
    updateAttendanceStatus(attendanceId, updateAttendanceDto) {
        return this.attendanceService.updateAttendanceStatus(attendanceId, updateAttendanceDto);
    }
    deleteAttendance(attendanceId) {
        return this.attendanceService.deleteAttendance(attendanceId);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Professor', 'Staff'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "createAttendance", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getAllAttendance", null);
__decorate([
    (0, common_1.Get)(':attendanceId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('attendanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Get)('students/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getStudentAttendance", null);
__decorate([
    (0, common_1.Get)('lectures/:lectureId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff', 'Professor'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getLectureAttendance", null);
__decorate([
    (0, common_1.Get)('students/:studentId/lectures/:lectureId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff', 'Professor'),
    __param(0, (0, common_1.Param)('lectureId')),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getLectureStudentAttendance", null);
__decorate([
    (0, common_1.Put)(':attendanceId/status'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff', 'Professor'),
    __param(0, (0, common_1.Param)('attendanceId')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "updateAttendanceStatus", null);
__decorate([
    (0, common_1.Delete)(':attendanceId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('attendanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "deleteAttendance", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('api/v1/attendances'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map