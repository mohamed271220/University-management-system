"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallModule = void 0;
const common_1 = require("@nestjs/common");
const hall_service_1 = require("./hall.service");
const hall_controller_1 = require("./hall.controller");
const auth_module_1 = require("../auth/auth.module");
const hall_entity_1 = require("./hall.entity");
const department_entity_1 = require("../department/department.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
const sequelize_1 = require("@nestjs/sequelize");
let HallModule = class HallModule {
};
exports.HallModule = HallModule;
exports.HallModule = HallModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([hall_entity_1.Hall, department_entity_1.Department, lecture_entity_1.Lecture]),
            auth_module_1.AuthModule,
        ],
        providers: [hall_service_1.HallService],
        controllers: [hall_controller_1.HallController],
    })
], HallModule);
//# sourceMappingURL=hall.module.js.map