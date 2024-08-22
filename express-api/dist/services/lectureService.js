"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureService = void 0;
const sequelize_1 = require("sequelize");
const Course_1 = __importDefault(require("../models/Course"));
const Hall_1 = __importDefault(require("../models/Hall"));
const Lecture_1 = __importDefault(require("../models/Lecture"));
const User_1 = __importDefault(require("../models/User"));
const uuid_1 = require("uuid");
const Attendance_1 = __importDefault(require("../models/Attendance"));
const LectureHistory_1 = __importDefault(require("../models/LectureHistory"));
class LectureService {
    constructor(lectureModel = Lecture_1.default) {
        this.lectureModel = lectureModel;
    }
    createLecture(database) {
        return __awaiter(this, void 0, void 0, function* () {
            const [course, professor, hall] = yield Promise.all([
                Course_1.default.findByPk(database.courseId),
                User_1.default.findByPk(database.professorId),
                Hall_1.default.findByPk(database.hallId),
            ]);
            if (!course) {
                throw new Error("Course not found");
            }
            if (!professor || professor.role !== "Professor") {
                throw new Error("Professor not found");
            }
            if (!hall) {
                throw new Error("Hall not found");
            }
            const isTimeValid = yield this.lectureModel.findOne({
                where: {
                    hallId: database.hallId, // Ensuring we are checking within the same hall
                    dayOfWeek: database.dayOfWeek,
                    [sequelize_1.Op.or]: [
                        // Check if the lecture starts or ends between the existing lecture's start and end time
                        {
                            startTime: {
                                [sequelize_1.Op.between]: [database.startTime, database.endTime],
                            },
                        },
                        {
                            endTime: {
                                [sequelize_1.Op.between]: [database.startTime, database.endTime],
                            },
                        },
                        // or if the new lecture's start and end time is between the
                        // existing lecture's start and end time
                        {
                            [sequelize_1.Op.and]: [
                                {
                                    startTime: {
                                        [sequelize_1.Op.lte]: database.startTime,
                                    },
                                },
                                {
                                    endTime: {
                                        [sequelize_1.Op.gte]: database.endTime,
                                    },
                                },
                            ],
                        },
                    ],
                },
            });
            if (isTimeValid) {
                throw new Error("Lecture already exists at this time in the same hall");
            }
            const lecture = yield this.lectureModel.create(Object.assign({ id: (0, uuid_1.v4)() }, database));
            return lecture;
        });
    }
    getAllLectures(offset_1, limit_1) {
        return __awaiter(this, arguments, void 0, function* (offset, limit, search = "") {
            const includeModels = [
                {
                    model: Course_1.default,
                    as: "course",
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
                    model: Hall_1.default,
                    as: "hall",
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
                    model: User_1.default,
                    as: "professor",
                    required: false,
                    attributes: { exclude: ["passwordHash"] },
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
                offset,
                limit,
                include: includeModels,
            });
            console.log(lectures);
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
            const lecture = yield this.lectureModel.findByPk(id, {
                include: [
                    {
                        model: Course_1.default,
                        as: "course",
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Hall_1.default,
                        as: "hall",
                    },
                ],
            });
            if (!lecture) {
                throw new Error("Lecture not found");
            }
            return lecture;
        });
    }
    updateLecture(id, database) {
        return __awaiter(this, void 0, void 0, function* () {
            const [course, professor, hall, lecture] = yield Promise.all([
                database.courseId ? Course_1.default.findByPk(database.courseId) : null,
                database.professorId ? User_1.default.findByPk(database.professorId) : null,
                database.hallId ? Hall_1.default.findByPk(database.hallId) : null,
                Lecture_1.default.findByPk(id),
            ]);
            if (!lecture)
                throw new Error("Lecture not found");
            if (database.courseId && !course)
                throw new Error("Course not found");
            if (database.professorId && (!professor || professor.role !== "Professor"))
                throw new Error("Professor not found");
            if (database.hallId && !hall)
                throw new Error("Hall not found");
            if (database.dayOfWeek || database.startTime || database.endTime) {
                const isTimeConflict = yield this.lectureModel.findOne({
                    where: {
                        id: {
                            [sequelize_1.Op.ne]: id,
                        },
                        dayOfWeek: database.dayOfWeek || lecture.dayOfWeek,
                        hallId: database.hallId || lecture.hallId,
                        [sequelize_1.Op.or]: [
                            {
                                startTime: {
                                    [sequelize_1.Op.between]: [
                                        database.startTime || lecture.startTime,
                                        database.endTime || lecture.endTime,
                                    ],
                                },
                            },
                            {
                                endTime: {
                                    [sequelize_1.Op.between]: [
                                        database.startTime || lecture.startTime,
                                        database.endTime || lecture.endTime,
                                    ],
                                },
                            },
                            {
                                [sequelize_1.Op.and]: [
                                    {
                                        startTime: {
                                            [sequelize_1.Op.lte]: database.startTime || lecture.startTime,
                                        },
                                    },
                                    {
                                        endTime: {
                                            [sequelize_1.Op.gte]: database.endTime || lecture.endTime,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                });
                if (isTimeConflict) {
                    throw new Error("Lecture already exists at this time");
                }
            }
            lecture.courseId = database.courseId || lecture.courseId;
            lecture.professorId = database.professorId || lecture.professorId;
            lecture.hallId = database.hallId || lecture.hallId;
            lecture.dayOfWeek = database.dayOfWeek || lecture.dayOfWeek;
            lecture.startTime = database.startTime || lecture.startTime;
            lecture.endTime = database.endTime || lecture.endTime;
            lecture.recurrencePattern =
                database.recurrencePattern || lecture.recurrencePattern;
            lecture.recurrenceEndDate =
                database.recurrenceEndDate || lecture.recurrenceEndDate;
            yield lecture.save();
            return lecture;
        });
    }
    deleteLecture(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lecture = yield this.lectureModel.findByPk(id);
            if (!lecture) {
                throw new Error("Lecture not found");
            }
            yield lecture.destroy();
        });
    }
    getAttendanceByLecture(lectureId, offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows: attendance } = yield Attendance_1.default.findAndCountAll({
                offset,
                limit,
                where: {
                    lectureId,
                },
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
            return { attendance, pagination };
        });
    }
    archiveLecture(lectureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lecture = yield this.lectureModel.findByPk(lectureId);
            if (!lecture) {
                throw new Error("Lecture not found");
            }
            const archivedLecture = yield LectureHistory_1.default.create(Object.assign(Object.assign({}, lecture.toJSON()), { id: (0, uuid_1.v4)(), lectureId: lecture.id, action: "Archived" }));
            yield lecture.destroy();
            return archivedLecture;
        });
    }
    getLectureHistory(lectureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lectureHistory = yield LectureHistory_1.default.findAll({
                where: {
                    lectureId,
                },
            });
            return lectureHistory;
        });
    }
}
exports.LectureService = LectureService;
