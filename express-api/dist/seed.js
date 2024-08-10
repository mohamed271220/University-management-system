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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const index_1 = require("./models/index");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(`CollegeSystem`, `root`, `1234`, {
    host: "localhost",
    dialect: "postgres",
    logging: console.log,
});
// Define courses
const courses = [
    { code: "CS101", name: "Introduction to Computer Science" },
    { code: "CS102", name: "Data Structures and Algorithms" },
    { code: "CS201", name: "Database Systems" },
    { code: "CS202", name: "Operating Systems" },
    { code: "CS301", name: "Computer Networks" },
    { code: "CS302", name: "Software Engineering" },
    { code: "MATH101", name: "Calculus I" },
    { code: "MATH102", name: "Calculus II" },
    { code: "PHYS101", name: "Physics I" },
    { code: "PHYS102", name: "Physics II" },
    { code: "CHEM101", name: "Chemistry I" },
    { code: "CHEM102", name: "Chemistry II" },
    { code: "BIO101", name: "Biology I" },
    { code: "BIO102", name: "Biology II" },
    { code: "ECON101", name: "Introduction to Economics" },
    { code: "ECON102", name: "Microeconomics" },
    { code: "HIST101", name: "World History" },
    { code: "HIST102", name: "Modern History" },
    { code: "PHIL101", name: "Introduction to Philosophy" },
    { code: "PHIL102", name: "Ethics" },
];
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("Connection has been established successfully.");
        // Sync all models
        yield sequelize.sync({ force: true }); // WARNING: This will drop and recreate tables
        // Create Departments
        const departmentIds = [];
        for (let i = 0; i < 5; i++) {
            const department = yield index_1.models.Department.create({
                name: faker_1.faker.company.department(),
                code: faker_1.faker.random.alphaNumeric(5).toUpperCase(),
            });
            departmentIds.push(department.id);
        }
        // Create Users
        const userIds = [];
        for (let i = 0; i < 10; i++) {
            const user = yield index_1.models.User.create({
                username: faker_1.faker.internet.userName(),
                password_hash: faker_1.faker.internet.password(),
                email: faker_1.faker.internet.email(),
                role: faker_1.faker.helpers.randomize([
                    "Admin",
                    "Student",
                    "Professor",
                    "Staff",
                ]),
            });
            userIds.push(user.id);
        }
        // Create Semesters
        const semesterIds = [];
        for (let i = 0; i < 2; i++) {
            const semester = yield index_1.models.Semester.create({
                name: faker_1.faker.lorem.words(),
                start_date: faker_1.faker.date.past(),
                end_date: faker_1.faker.date.future(),
            });
            semesterIds.push(semester.id);
        }
        // Create Courses
        const courseIds = [];
        for (const course of courses) {
            const courseRecord = yield index_1.models.Course.create({
                code: course.code,
                name: course.name,
                description: faker_1.faker.lorem.paragraph(),
                credits: faker_1.faker.datatype.number({ min: 1, max: 5 }),
                department_id: faker_1.faker.helpers.randomize(departmentIds),
                professor_id: faker_1.faker.helpers.randomize(userIds),
            });
            courseIds.push(courseRecord.id);
        }
        // Create Halls
        const hallIds = [];
        for (let i = 0; i < 5; i++) {
            const hall = yield index_1.models.Hall.create({
                name: faker_1.faker.random.word(),
                is_lab: faker_1.faker.datatype.boolean(),
                department_id: faker_1.faker.helpers.randomize(departmentIds),
            });
            hallIds.push(hall.id);
        }
        // Create Lecture History
        for (let i = 0; i < 10; i++) {
            yield index_1.models.LectureHistory.create({
                lecture_id: faker_1.faker.datatype.uuid(),
                course_id: faker_1.faker.helpers.randomize(courseIds),
                professor_id: faker_1.faker.helpers.randomize(userIds),
                hall_id: faker_1.faker.helpers.randomize(hallIds),
                day_of_week: faker_1.faker.helpers.randomize([
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ]),
                start_time: faker_1.faker.date.recent().toTimeString().split(" ")[0],
                end_time: faker_1.faker.date.recent().toTimeString().split(" ")[0],
                action: faker_1.faker.helpers.randomize(["Created", "Updated", "Deleted"]),
                timestamp: faker_1.faker.date.recent(),
            });
        }
        // Create Lectures
        for (let i = 0; i < 20; i++) {
            yield index_1.models.Lecture.create({
                course_id: faker_1.faker.helpers.randomize(courseIds),
                professor_id: faker_1.faker.helpers.randomize(userIds),
                hall_id: faker_1.faker.helpers.randomize(hallIds),
                day_of_week: faker_1.faker.helpers.randomize([
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ]),
                start_time: faker_1.faker.date.recent().toTimeString().split(" ")[0],
                end_time: faker_1.faker.date.recent().toTimeString().split(" ")[0],
                recurrence_pattern: faker_1.faker.lorem.word(),
                recurrence_end_date: faker_1.faker.date.future(),
            });
        }
        // Create Attendances
        for (let i = 0; i < 50; i++) {
            yield index_1.models.Attendance.create({
                student_id: faker_1.faker.helpers.randomize(userIds),
                lecture_id: faker_1.faker.helpers.randomize(courseIds),
                status: faker_1.faker.helpers.randomize(["Present", "Absent", "Excused"]),
            });
        }
        // Create Grades
        for (let i = 0; i < 50; i++) {
            yield index_1.models.Grade.create({
                student_id: faker_1.faker.helpers.randomize(userIds),
                course_id: faker_1.faker.helpers.randomize(courseIds),
                semester_id: faker_1.faker.helpers.randomize(semesterIds),
                grade: faker_1.faker.random.alphaNumeric(2).toUpperCase(),
                date: faker_1.faker.date.past(),
                description: faker_1.faker.lorem.sentence(),
            });
        }
        // Create Timetables
        for (let i = 0; i < 20; i++) {
            yield index_1.models.Timetable.create({
                entity_id: faker_1.faker.helpers.randomize(userIds),
                entity_type: faker_1.faker.helpers.randomize(["Student", "Professor", "Hall"]),
                lecture_id: faker_1.faker.helpers.randomize(courseIds),
            });
        }
        // Create Audit Logs
        for (let i = 0; i < 10; i++) {
            yield index_1.models.AuditLog.create({
                table_name: faker_1.faker.random.word(),
                record_id: faker_1.faker.datatype.uuid(),
                action: faker_1.faker.helpers.randomize(["INSERT", "UPDATE", "DELETE"]),
                old_data: faker_1.faker.datatype.json(),
                new_data: faker_1.faker.datatype.json(),
                changed_at: faker_1.faker.date.recent(),
                changed_by: faker_1.faker.helpers.randomize(userIds),
            });
        }
        // Create Course Cache
        for (let i = 0; i < 10; i++) {
            yield index_1.models.CourseCache.create({
                course_id: faker_1.faker.helpers.randomize(courseIds),
                course_name: faker_1.faker.random.words(),
                department_name: faker_1.faker.random.words(),
                professor_name: faker_1.faker.random.words(),
                cached_at: faker_1.faker.date.recent(),
            });
        }
        // Create Professor Courses
        for (let i = 0; i < 10; i++) {
            yield index_1.models.ProfessorCourses.create({
                professor_id: faker_1.faker.helpers.randomize(userIds),
                course_id: faker_1.faker.helpers.randomize(courseIds),
            });
        }
        // Create Student Courses
        for (let i = 0; i < 10; i++) {
            yield index_1.models.StudentCourses.create({
                student_id: faker_1.faker.helpers.randomize(userIds),
                course_id: faker_1.faker.helpers.randomize(courseIds),
                semester_id: faker_1.faker.helpers.randomize(semesterIds),
                enrollment_date: faker_1.faker.date.past(),
            });
        }
        // Create Student Years
        for (let i = 0; i < 10; i++) {
            yield index_1.models.StudentYears.create({
                student_id: faker_1.faker.helpers.randomize(userIds),
                year: faker_1.faker.helpers.randomize([
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year",
                ]),
                effective_date: faker_1.faker.date.past(),
            });
        }
        console.log("Database seeded successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
seedDatabase();
