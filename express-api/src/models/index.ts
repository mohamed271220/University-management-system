import { Sequelize } from "sequelize";
import User from "./User";
import Profile from "./Profile";
import Department from "./Department";
import Course from "./Course";
import Hall from "./Hall";
import Lecture from "./Lecture";
import Attendance from "./Attendance";
import Grade from "./Grade";
import Timetable from "./Timetable";
import LectureHistory from "./LectureHistory";
import AuditLog from "./AuditLog";
import CourseCache from "./CourseCache";
import ProfessorCourse from "./ProfessorCourses";
import StudentCourse from "./StudentCourses";
import Semester from "./Semester";
import StudentYear from "./StudentYears";

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
  Timetable,
  LectureHistory,
  AuditLog,
  CourseCache,
  ProfessorCourse,
  StudentCourse,
  Semester,
  StudentYear,
};

// Define associations
User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

Department.hasMany(Course, { foreignKey: "departmentId" });
Course.belongsTo(Department, { foreignKey: "departmentId" });

User.hasMany(Course, { foreignKey: "professorId" });
Course.belongsTo(User, { foreignKey: "professorId" });

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

Course.belongsToMany(User, {
  through: ProfessorCourse,
  foreignKey: "courseId",
});
User.belongsToMany(Course, {
  through: ProfessorCourse,
  foreignKey: "professorId",
});

Course.belongsToMany(User, {
  through: StudentCourse,
  foreignKey: "courseId",
});
User.belongsToMany(Course, {
  through: StudentCourse,
  foreignKey: "studentId",
});

Semester.hasMany(StudentCourse, { foreignKey: "semesterId" });
StudentCourse.belongsTo(Semester, { foreignKey: "semesterId" });

User.hasMany(StudentYear, { foreignKey: "studentId" });
StudentYear.belongsTo(User, { foreignKey: "studentId" });


export default models;