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
exports.StudentYearService = void 0;
const common_1 = require("@nestjs/common");
const student_year_entity_1 = require("./student-year.entity");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const sequelize_1 = require("@nestjs/sequelize");
const department_entity_1 = require("../department/department.entity");
const uuid_1 = require("uuid");
let StudentYearService = class StudentYearService {
    constructor(studentYearModel, userModel, courseModel, departmentModel) {
        this.studentYearModel = studentYearModel;
        this.userModel = userModel;
        this.courseModel = courseModel;
        this.departmentModel = departmentModel;
    }
    createStudentYear(createStudentYearDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId, effectiveDate, departmentId } = createStudentYearDto;
            const [existingStudentYear, student, department] = yield Promise.all([
                this.studentYearModel.findOne({
                    where: { studentId, effectiveDate },
                }),
                this.userModel.findOne({ where: { id: studentId } }),
                this.departmentModel.findOne({ where: { id: departmentId } }),
            ]);
            if (existingStudentYear) {
                throw new common_1.NotFoundException('Student year already exists');
            }
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            const studentYear = yield this.studentYearModel.create(Object.assign({ id: (0, uuid_1.v4)() }, createStudentYearDto));
            return studentYear;
        });
    }
    getAllStudentYears() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studentYearModel.findAll();
        });
    }
    getStudentYearsByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.userModel.findByPk(studentId);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            return this.studentYearModel.findAll({
                where: { studentId },
            });
        });
    }
    updateStudentYear(studentYearId, updateStudentYearDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentYear = yield this.studentYearModel.findByPk(studentYearId);
            if (!studentYear) {
                throw new common_1.NotFoundException('Student year not found');
            }
            return studentYear.update(updateStudentYearDto);
        });
    }
    deleteStudentYear(studentYearId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentYear = yield this.studentYearModel.findByPk(studentYearId);
            if (!studentYear) {
                throw new common_1.NotFoundException('Student year not found');
            }
            return studentYear.destroy();
        });
    }
};
exports.StudentYearService = StudentYearService;
exports.StudentYearService = StudentYearService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_year_entity_1.StudentYear)),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(3, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], StudentYearService);
//# sourceMappingURL=student-year.service.js.map