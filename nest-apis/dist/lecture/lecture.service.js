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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureService = void 0;
const common_1 = require("@nestjs/common");
const lecture_entity_1 = require("./lecture.entity");
const user_entity_1 = require("../user/user.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const lecture_history_entity_1 = require("../lecture-history/lecture-history.entity");
const course_entity_1 = require("../course/course.entity");
const hall_entity_1 = require("../hall/hall.entity");
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@nestjs/sequelize");
let LectureService = class LectureService {
    constructor(lectureModel, userModel, attendanceModel, lectureHistoryModel, courseModel, hallModel) {
        this.lectureModel = lectureModel;
        this.userModel = userModel;
        this.attendanceModel = attendanceModel;
        this.lectureHistoryModel = lectureHistoryModel;
        this.courseModel = courseModel;
        this.hallModel = hallModel;
    }
    createLecture(createLectureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { professorId, courseId, hallId } = createLectureDto, lectureData = __rest(createLectureDto, ["professorId", "courseId", "hallId"]);
            const [professor, course, hall] = yield Promise.all([
                this.userModel.findByPk(professorId),
                this.courseModel.findByPk(courseId),
                this.hallModel.findByPk(hallId),
            ]);
            if (!professor || professor.role !== 'Professor') {
                throw new common_1.NotFoundException('Professor not found');
            }
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            if (!hall) {
                throw new common_1.NotFoundException('Hall not found');
            }
            const isTimeValid = yield this.lectureModel.findOne({
                where: {
                    hallId: hallId,
                    dayOfWeek: lectureData.dayOfWeek,
                    [sequelize_1.Op.or]: [
                        {
                            startTime: {
                                [sequelize_1.Op.between]: [lectureData.startTime, lectureData.endTime],
                            },
                        },
                        {
                            endTime: {
                                [sequelize_1.Op.between]: [lectureData.startTime, lectureData.endTime],
                            },
                        },
                        {
                            [sequelize_1.Op.and]: [
                                {
                                    startTime: {
                                        [sequelize_1.Op.lte]: lectureData.startTime,
                                    },
                                },
                                {
                                    endTime: {
                                        [sequelize_1.Op.gte]: lectureData.endTime,
                                    },
                                },
                            ],
                        },
                    ],
                },
            });
            if (isTimeValid) {
                throw new common_1.BadRequestException('Lecture time is overlapping with another lecture');
            }
            return this.lectureModel.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, lectureData), { professorId,
                courseId,
                hallId }));
        });
    }
    getAllLectures() {
        return __awaiter(this, arguments, void 0, function* (search = '', limit = 10, offset = 0) {
            const includeModels = [
                {
                    model: this.courseModel,
                    as: 'course',
                    required: false,
                    where: search
                        ? {
                            name: {
                                [sequelize_1.Op.like]: `%${search}%`,
                            },
                        }
                        : undefined,
                },
                {
                    model: this.hallModel,
                    as: 'hall',
                    required: false,
                    where: search
                        ? {
                            name: {
                                [sequelize_1.Op.like]: `%${search}%`,
                            },
                        }
                        : undefined,
                },
                {
                    model: this.userModel,
                    as: 'professor',
                    required: false,
                    attributes: { exclude: ['passwordHash'] },
                    where: search
                        ? {
                            username: {
                                [sequelize_1.Op.like]: `%${search}%`,
                            },
                        }
                        : undefined,
                },
            ];
            const { count, rows: lectures } = yield this.lectureModel.findAndCountAll({
                raw: true,
                nest: true,
                offset,
                limit,
                include: includeModels,
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
            return { lectures, pagination };
        });
    }
    getLectureById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.lectureModel.findByPk(id, {
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.hallModel,
                        as: 'hall',
                    },
                    {
                        model: this.userModel,
                        as: 'professor',
                        attributes: { exclude: ['passwordHash'] },
                    },
                ],
            });
        });
    }
    getLectureAttendance(lectureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lecture = yield this.lectureModel.findByPk(lectureId);
            if (!lecture) {
                throw new common_1.NotFoundException('Lecture not found');
            }
            return this.attendanceModel.findAll({
                where: { lectureId },
            });
        });
    }
    getLectureArchived(lectureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lecture = yield this.lectureModel.findByPk(lectureId);
            if (!lecture) {
                throw new common_1.NotFoundException('Lecture not found');
            }
            return this.lectureHistoryModel.findAll({
                where: { lectureId },
            });
        });
    }
    updateLecture(lectureId, updateLectureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [course, professor, hall, lecture] = yield Promise.all([
                updateLectureDto.courseId
                    ? this.courseModel.findByPk(updateLectureDto.courseId)
                    : null,
                updateLectureDto.professorId
                    ? this.userModel.findByPk(updateLectureDto.professorId)
                    : null,
                updateLectureDto.hallId ? hall_entity_1.Hall.findByPk(updateLectureDto.hallId) : null,
                this.lectureModel.findByPk(lectureId),
            ]);
            if (!lecture)
                throw new common_1.NotFoundException('Lecture not found');
            if (updateLectureDto.courseId && !course)
                throw new common_1.NotFoundException('Course not found');
            if (updateLectureDto.professorId &&
                (!professor || professor.role !== 'Professor'))
                throw new common_1.NotFoundException('Professor not found');
            if (updateLectureDto.hallId && !hall)
                throw new common_1.NotFoundException('Hall not found');
            if (updateLectureDto.dayOfWeek ||
                updateLectureDto.startTime ||
                updateLectureDto.endTime) {
                const isTimeConflict = yield this.lectureModel.findOne({
                    where: {
                        id: {
                            [sequelize_1.Op.ne]: lectureId,
                        },
                        dayOfWeek: updateLectureDto.dayOfWeek || lecture.dayOfWeek,
                        hallId: updateLectureDto.hallId || lecture.hallId,
                        [sequelize_1.Op.or]: [
                            {
                                startTime: {
                                    [sequelize_1.Op.between]: [
                                        updateLectureDto.startTime || lecture.startTime,
                                        updateLectureDto.endTime || lecture.endTime,
                                    ],
                                },
                            },
                            {
                                endTime: {
                                    [sequelize_1.Op.between]: [
                                        updateLectureDto.startTime || lecture.startTime,
                                        updateLectureDto.endTime || lecture.endTime,
                                    ],
                                },
                            },
                            {
                                [sequelize_1.Op.and]: [
                                    {
                                        startTime: {
                                            [sequelize_1.Op.lte]: updateLectureDto.startTime || lecture.startTime,
                                        },
                                    },
                                    {
                                        endTime: {
                                            [sequelize_1.Op.gte]: updateLectureDto.endTime || lecture.endTime,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                });
                if (isTimeConflict) {
                    throw new common_1.BadRequestException('Lecture time is overlapping with another lecture');
                }
            }
            lecture.courseId = updateLectureDto.courseId || lecture.courseId;
            lecture.professorId = updateLectureDto.professorId || lecture.professorId;
            lecture.hallId = updateLectureDto.hallId || lecture.hallId;
            lecture.dayOfWeek = updateLectureDto.dayOfWeek || lecture.dayOfWeek;
            lecture.startTime = updateLectureDto.startTime || lecture.startTime;
            lecture.endTime = updateLectureDto.endTime || lecture.endTime;
            lecture.recurrencePattern =
                updateLectureDto.recurrencePattern || lecture.recurrencePattern;
            lecture.recurrenceEndDate =
                updateLectureDto.recurrenceEndDate || lecture.recurrenceEndDate;
            yield lecture.save();
            return lecture;
        });
    }
    deleteLecture(lectureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lecture = yield this.lectureModel.findByPk(lectureId);
            if (!lecture) {
                throw new common_1.NotFoundException('Lecture not found');
            }
            yield lecture.destroy();
            return lecture;
        });
    }
};
exports.LectureService = LectureService;
exports.LectureService = LectureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_2.InjectModel)(lecture_entity_1.Lecture)),
    __param(1, (0, sequelize_2.InjectModel)(user_entity_1.User)),
    __param(2, (0, sequelize_2.InjectModel)(attendance_entity_1.Attendance)),
    __param(3, (0, sequelize_2.InjectModel)(lecture_history_entity_1.LectureHistory)),
    __param(4, (0, sequelize_2.InjectModel)(course_entity_1.Course)),
    __param(5, (0, sequelize_2.InjectModel)(hall_entity_1.Hall)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], LectureService);
//# sourceMappingURL=lecture.service.js.map