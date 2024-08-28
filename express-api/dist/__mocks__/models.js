"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hall = exports.Lecture = exports.Department = exports.User = exports.Course = void 0;
// __mocks__/models.ts
const globals_1 = require("@jest/globals");
const sequelize_1 = require("sequelize");
const mockFindByPk = globals_1.jest.fn();
const mockFindOne = globals_1.jest.fn();
const mockCreate = globals_1.jest.fn();
const mockSave = globals_1.jest.fn();
const mockDestroy = globals_1.jest.fn();
class Course extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.save = mockSave;
        this.destroy = mockDestroy;
    }
}
exports.Course = Course;
Course.findByPk = mockFindByPk;
Course.findOne = mockFindOne;
Course.create = mockCreate;
class User extends sequelize_1.Model {
}
exports.User = User;
User.findByPk = mockFindByPk;
class Department extends sequelize_1.Model {
}
exports.Department = Department;
Department.findByPk = mockFindByPk;
class Lecture extends sequelize_1.Model {
}
exports.Lecture = Lecture;
class Hall extends sequelize_1.Model {
}
exports.Hall = Hall;
