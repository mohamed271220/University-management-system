"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCacheModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const course_cache_service_1 = require("./course-cache.service");
const course_cache_controller_1 = require("./course-cache.controller");
const course_cache_entity_1 = require("./course-cache.entity");
const auth_module_1 = require("../auth/auth.module");
let CourseCacheModule = class CourseCacheModule {
};
exports.CourseCacheModule = CourseCacheModule;
exports.CourseCacheModule = CourseCacheModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([course_cache_entity_1.CourseCache]), auth_module_1.AuthModule],
        controllers: [course_cache_controller_1.CourseCacheController],
        providers: [course_cache_service_1.CourseCacheService],
        exports: [course_cache_service_1.CourseCacheService],
    })
], CourseCacheModule);
//# sourceMappingURL=course-cache.module.js.map