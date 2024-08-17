"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const User_1 = __importDefault(require("./User"));
const Profile_1 = __importDefault(require("./Profile"));
const Department_1 = __importDefault(require("./Department"));
const Course_1 = __importDefault(require("./Course"));
const Hall_1 = __importDefault(require("./Hall"));
const Lecture_1 = __importDefault(require("./Lecture"));
const Attendance_1 = __importDefault(require("./Attendance"));
const Grade_1 = __importDefault(require("./Grade"));
const Timetable_1 = __importDefault(require("./Timetable"));
const LectureHistory_1 = __importDefault(require("./LectureHistory"));
const AuditLog_1 = __importDefault(require("./AuditLog"));
const CourseCache_1 = __importDefault(require("./CourseCache"));
const ProfessorCourses_1 = __importDefault(require("./ProfessorCourses"));
const StudentCourses_1 = __importDefault(require("./StudentCourses"));
const Semester_1 = __importDefault(require("./Semester"));
const StudentYears_1 = __importDefault(require("./StudentYears"));
// Define the models
exports.models = {
    User: User_1.default,
    Profile: Profile_1.default,
    Department: Department_1.default,
    Course: Course_1.default,
    Hall: Hall_1.default,
    Lecture: Lecture_1.default,
    Attendance: Attendance_1.default,
    Grade: Grade_1.default,
    Timetable: Timetable_1.default,
    LectureHistory: LectureHistory_1.default,
    AuditLog: AuditLog_1.default,
    CourseCache: CourseCache_1.default,
    ProfessorCourse: ProfessorCourses_1.default,
    StudentCourse: StudentCourses_1.default,
    Semester: Semester_1.default,
    StudentYear: StudentYears_1.default,
};
// Define associations
User_1.default.hasOne(Profile_1.default, { foreignKey: "userId" });
Profile_1.default.belongsTo(User_1.default, { foreignKey: "userId" });
Department_1.default.hasMany(Course_1.default, { foreignKey: "departmentId" });
Course_1.default.belongsTo(Department_1.default, { foreignKey: "departmentId" });
User_1.default.hasMany(Course_1.default, { foreignKey: "professorId" });
Course_1.default.belongsTo(User_1.default, { as: "professor", foreignKey: "professorId" });
Course_1.default.hasMany(Lecture_1.default, { foreignKey: "courseId" });
Lecture_1.default.belongsTo(Course_1.default, { foreignKey: "courseId" });
User_1.default.hasMany(Lecture_1.default, { foreignKey: "professorId" });
Lecture_1.default.belongsTo(User_1.default, { foreignKey: "professorId" });
Hall_1.default.hasMany(Lecture_1.default, { foreignKey: "hallId" });
Lecture_1.default.belongsTo(Hall_1.default, { foreignKey: "hallId" });
Lecture_1.default.hasMany(Attendance_1.default, { foreignKey: "lectureId" });
Attendance_1.default.belongsTo(Lecture_1.default, { foreignKey: "lectureId" });
User_1.default.hasMany(Attendance_1.default, { foreignKey: "studentId" });
Attendance_1.default.belongsTo(User_1.default, { foreignKey: "studentId" });
Course_1.default.hasMany(Grade_1.default, { foreignKey: "courseId" });
Grade_1.default.belongsTo(Course_1.default, { foreignKey: "courseId" });
User_1.default.hasMany(Grade_1.default, { foreignKey: "studentId" });
Grade_1.default.belongsTo(User_1.default, { foreignKey: "studentId" });
Semester_1.default.hasMany(Grade_1.default, { foreignKey: "semesterId" });
Grade_1.default.belongsTo(Semester_1.default, { foreignKey: "semesterId" });
Course_1.default.belongsToMany(User_1.default, {
    through: ProfessorCourses_1.default,
    foreignKey: "courseId",
    as: "professors",
});
User_1.default.belongsToMany(Course_1.default, {
    through: ProfessorCourses_1.default,
    foreignKey: "professorId",
    as: "teachingCourses",
});
Course_1.default.belongsToMany(User_1.default, {
    through: StudentCourses_1.default,
    foreignKey: "courseId",
    as: "students",
});
User_1.default.belongsToMany(Course_1.default, {
    through: StudentCourses_1.default,
    foreignKey: "studentId",
    as: "enrolledCourses",
});
// Many to Many associations
ProfessorCourses_1.default.belongsTo(User_1.default, { foreignKey: "professorId" });
User_1.default.hasMany(ProfessorCourses_1.default, { foreignKey: "professorId" });
ProfessorCourses_1.default.belongsTo(Course_1.default, { foreignKey: "courseId" });
Course_1.default.hasMany(ProfessorCourses_1.default, { foreignKey: "courseId" });
StudentCourses_1.default.belongsTo(User_1.default, { foreignKey: "studentId" });
User_1.default.hasMany(StudentCourses_1.default, { foreignKey: "studentId" });
StudentCourses_1.default.belongsTo(Course_1.default, { foreignKey: "courseId" });
Course_1.default.hasMany(StudentCourses_1.default, { foreignKey: "courseId" });
Semester_1.default.hasMany(StudentCourses_1.default, { foreignKey: "semesterId" });
StudentCourses_1.default.belongsTo(Semester_1.default, { foreignKey: "semesterId" });
User_1.default.hasMany(StudentYears_1.default, { foreignKey: "studentId" });
StudentYears_1.default.belongsTo(User_1.default, { foreignKey: "studentId" });
exports.default = exports.models;
