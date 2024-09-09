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
exports.TimetableController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const timetable_service_1 = require("./timetable.service");
let TimetableController = class TimetableController {
    constructor(timetableService) {
        this.timetableService = timetableService;
    }
    getStudentTimetable(studentId, semesterId) {
        return this.timetableService.getStudentTimetable(studentId, semesterId);
    }
    getProfessorTimetable(professorId) {
        return this.timetableService.getProfessorTimetable(professorId);
    }
    getDepartmentTimetable(departmentId) {
        return this.timetableService.getDepartmentTimetable(departmentId);
    }
    getHallTimetable(hallId) {
        return this.timetableService.getHallTimetable(hallId);
    }
    getStudentYearTimetable(departmentId, year) {
        return this.timetableService.getStudentYearTimetable(departmentId, year);
    }
};
exports.TimetableController = TimetableController;
__decorate([
    (0, common_1.Get)('students/:studentId/:semesterId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getStudentTimetable", null);
__decorate([
    (0, common_1.Get)('professors/:professorId'),
    __param(0, (0, common_1.Param)('professorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getProfessorTimetable", null);
__decorate([
    (0, common_1.Get)('departments/:departmentId'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getDepartmentTimetable", null);
__decorate([
    (0, common_1.Get)('halls/:hallId'),
    __param(0, (0, common_1.Param)('hallId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getHallTimetable", null);
__decorate([
    (0, common_1.Get)('departments/:departmentId/years'),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getStudentYearTimetable", null);
exports.TimetableController = TimetableController = __decorate([
    (0, common_1.Controller)('timetable'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [timetable_service_1.TimetableService])
], TimetableController);
//# sourceMappingURL=timetable.controller.js.map