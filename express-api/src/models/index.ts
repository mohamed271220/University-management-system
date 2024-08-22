import { Sequelize } from "sequelize";
import User from "./User";
import Profile from "./Profile";
import Department from "./Department";
import Course from "./Course";
import Hall from "./Hall";
import Lecture from "./Lecture";
import Attendance from "./Attendance";
import Grade from "./Grade";
import LectureHistory from "./LectureHistory";
import AuditLog from "./AuditLog";
import CourseCache from "./CourseCache";
import ProfessorCourse from "./ProfessorCourses";
import StudentCourse from "./StudentCourses";
import Semester from "./Semester";
import StudentYear from "./StudentYears";
import DepartmentYearCourses from "./DepartmentYearCourses";

// Define the models
export const models = {
  User,
  Profile,
  Department,
  Course,
  Hall,
  Lecture,
  Attendance,
  Grade,
  LectureHistory,
  AuditLog,
  CourseCache,
  ProfessorCourse,
  StudentCourse,
  Semester,
  StudentYear,
  DepartmentYearCourses,
};

// Define associations
User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

Department.hasMany(Course, { foreignKey: "departmentId" });
Course.belongsTo(Department, { foreignKey: "departmentId" });

User.hasMany(Course, { foreignKey: "professorId" });
Course.belongsTo(User, { as: "professor", foreignKey: "professorId" });

Course.hasMany(Lecture, { foreignKey: "courseId" });
Lecture.belongsTo(Course, { foreignKey: "courseId" });

User.hasMany(Lecture, { foreignKey: "professorId" });
Lecture.belongsTo(User, { foreignKey: "professorId" });

Hall.hasMany(Lecture, { foreignKey: "hallId" });
Lecture.belongsTo(Hall, { foreignKey: "hallId" });

Lecture.hasMany(Attendance, { foreignKey: "lectureId" });
Attendance.belongsTo(Lecture, { foreignKey: "lectureId" });

User.hasMany(Attendance, { foreignKey: "studentId" });
Attendance.belongsTo(User, { foreignKey: "studentId" });

Course.hasMany(Grade, { foreignKey: "courseId" });
Grade.belongsTo(Course, { foreignKey: "courseId" });

User.hasMany(Grade, { foreignKey: "studentId" });
Grade.belongsTo(User, { foreignKey: "studentId" });

Semester.hasMany(Grade, { foreignKey: "semesterId" });
Grade.belongsTo(Semester, { foreignKey: "semesterId" });

// Professors can teach many courses and courses can have many professors
Course.belongsToMany(User, {
  through: ProfessorCourse,
  foreignKey: "courseId",
  as: "professors",
});
User.belongsToMany(Course, {
  through: ProfessorCourse,
  foreignKey: "professorId",
  as: "teachingCourses",
});

// Students can enroll in many courses and courses can have many students
Course.belongsToMany(User, {
  through: StudentCourse,
  foreignKey: "courseId",
  as: "students",
});
User.belongsToMany(Course, {
  through: StudentCourse,
  foreignKey: "studentId",
  as: "enrolledCourses",
});

// Many to Many associations
ProfessorCourse.belongsTo(User, { foreignKey: "professorId" });
User.hasMany(ProfessorCourse, { foreignKey: "professorId" });

ProfessorCourse.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(ProfessorCourse, { foreignKey: "courseId" });

StudentCourse.belongsTo(User, { foreignKey: "studentId" });
User.hasMany(StudentCourse, { foreignKey: "studentId" });

StudentCourse.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(StudentCourse, { foreignKey: "courseId" });

// a semester has many student courses
Semester.hasMany(StudentCourse, { foreignKey: "semesterId" });
StudentCourse.belongsTo(Semester, { foreignKey: "semesterId" });

// a student has many student years records and a student year record belongs to a student
User.hasMany(StudentYear, { foreignKey: "studentId" });
StudentYear.belongsTo(User, { foreignKey: "studentId" });

DepartmentYearCourses.belongsTo(Department, { foreignKey: "departmentId" });
Department.hasMany(DepartmentYearCourses, { foreignKey: "departmentId" });

DepartmentYearCourses.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(DepartmentYearCourses, { foreignKey: "courseId" });

StudentYear.belongsTo(Department, { foreignKey: "departmentId" });
Department.hasMany(StudentYear, { foreignKey: "departmentId" });

StudentYear.belongsTo(User, { foreignKey: "studentId" });
User.hasMany(StudentYear, { foreignKey: "studentId" });

Lecture.belongsTo(Course, { as: "course" });
Lecture.belongsTo(User, { as: "professor" });
Lecture.belongsTo(Hall, { as: "hall" });

export default models;
