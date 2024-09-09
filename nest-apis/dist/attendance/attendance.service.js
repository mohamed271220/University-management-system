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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const attendance_entity_1 = require("./attendance.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
const user_entity_1 = require("../user/user.entity");
const sequelize_1 = require("@nestjs/sequelize");
const uuid_1 = require("uuid");
const student_course_entity_1 = require("../student-course/student-course.entity");
const hall_entity_1 = require("../hall/hall.entity");
let AttendanceService = class AttendanceService {
    constructor(attendanceModel, lectureModel, userModel, studentCourseModel, hallModel) {
        this.attendanceModel = attendanceModel;
        this.lectureModel = lectureModel;
        this.userModel = userModel;
        this.studentCourseModel = studentCourseModel;
        this.hallModel = hallModel;
    }
    createAttendance(createAttendanceDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId, lectureId } = createAttendanceDto;
            const [student, lecture] = yield Promise.all([
                this.userModel.findByPk(studentId),
                this.lectureModel.findByPk(lectureId),
            ]);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Invalid student ID');
            }
            if (!lecture) {
                throw new common_1.NotFoundException('Invalid lecture ID');
            }
            if (user.role === 'Professor' && user.id !== (lecture === null || lecture === void 0 ? void 0 : lecture.professorId)) {
                throw new common_1.BadRequestException('You are not authorized to sign students for this lecture');
            }
            const isStudentSignedForCourse = yield this.studentCourseModel.findOne({
                where: { studentId, courseId: lecture === null || lecture === void 0 ? void 0 : lecture.courseId },
            });
            if (!isStudentSignedForCourse) {
                throw new common_1.NotFoundException('Student is not signed for this course');
            }
            try {
                const attendance = yield this.attendanceModel.create(Object.assign({ id: (0, uuid_1.v4)() }, createAttendanceDto));
                return attendance;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    getAllAttendance(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows: attendance } = yield this.attendanceModel.findAndCountAll({
                raw: true,
                nest: true,
                limit,
                offset,
            });
            const totalPages = Math.ceil(count / limit);
            const currentPage = Math.ceil(offset / limit) + 1;
            const hasNextPage = currentPage < totalPages;
            const hasPreviousPage = currentPage > 1;
            const pagination = {
                totalItems: count,
                itemsPerPage: limit,
                currentPage: currentPage,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage,
                nextPage: hasNextPage ? currentPage + 1 : null,
                previousPage: hasPreviousPage ? currentPage - 1 : null,
            };
            return { pagination, attendance };
        });
    }
    getAttendance(attendanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield this.attendanceModel.findByPk(attendanceId, {
                raw: true,
                nest: true,
            });
            if (!attendance) {
                throw new common_1.NotFoundException('Attendance not found');
            }
            return attendance;
        });
    }
    getStudentAttendance(studentId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.userModel.findByPk(studentId);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Invalid student ID');
            }
            if (user.role === 'Student' && user.id !== studentId) {
                throw new common_1.BadRequestException('You are not authorized to view this data');
            }
            const attendance = yield this.attendanceModel.findAll({
                where: { studentId },
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.lectureModel,
                        include: [
                            {
                                model: this.hallModel,
                            },
                        ],
                    },
                ],
            });
            return attendance;
        });
    }
    getLectureAttendance(lectureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lecture = yield this.lectureModel.findByPk(lectureId);
            if (!lecture) {
                throw new common_1.NotFoundException('Lecture not found');
            }
            const attendance = yield this.attendanceModel.findAll({
                where: { lectureId },
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.userModel,
                        as: 'student',
                    },
                    {
                        model: this.lectureModel,
                        include: [{ model: this.hallModel }],
                    },
                ],
            });
            return attendance;
        });
    }
    getLectureStudentAttendance(lectureId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [student, lecture] = yield Promise.all([
                this.userModel.findByPk(studentId),
                this.lectureModel.findByPk(lectureId),
            ]);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Invalid student ID');
            }
            if (!lecture) {
                throw new common_1.NotFoundException('Invalid lecture ID');
            }
            const attendance = yield this.attendanceModel.findAll({
                where: { studentId, lectureId },
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.lectureModel,
                        include: [{ model: this.hallModel }],
                    },
                ],
            });
            return attendance;
        });
    }
    updateAttendanceStatus(attendanceId, updateAttendanceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield this.attendanceModel.findByPk(attendanceId);
            if (!attendance) {
                throw new common_1.NotFoundException('Attendance not found');
            }
            const { status } = updateAttendanceDto;
            attendance.status = status;
            yield attendance.save();
            return attendance;
        });
    }
    deleteAttendance(attendanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield this.attendanceModel.findByPk(attendanceId);
            if (!attendance) {
                throw new common_1.NotFoundException('Attendance not found');
            }
            yield attendance.destroy();
            return { message: 'Attendance deleted successfully' };
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(attendance_entity_1.Attendance)),
    __param(1, (0, sequelize_1.InjectModel)(lecture_entity_1.Lecture)),
    __param(2, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(student_course_entity_1.StudentCourse)),
    __param(4, (0, sequelize_1.InjectModel)(hall_entity_1.Hall)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map