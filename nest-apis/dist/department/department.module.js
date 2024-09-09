"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModule = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("./department.service");
const sequelize_1 = require("@nestjs/sequelize");
const department_controller_1 = require("./department.controller");
const auth_module_1 = require("../auth/auth.module");
const department_entity_1 = require("./department.entity");
const course_entity_1 = require("../course/course.entity");
const hall_entity_1 = require("../hall/hall.entity");
let DepartmentModule = class DepartmentModule {
};
exports.DepartmentModule = DepartmentModule;
exports.DepartmentModule = DepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([department_entity_1.Department, course_entity_1.Course, hall_entity_1.Hall]), auth_module_1.AuthModule],
        providers: [department_service_1.DepartmentService],
        controllers: [department_controller_1.DepartmentController],
    })
], DepartmentModule);
//# sourceMappingURL=department.module.js.map