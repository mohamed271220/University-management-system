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
exports.CourseCacheService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const course_cache_entity_1 = require("../entities/course-cache.entity");
let CourseCacheService = class CourseCacheService {
    constructor(courseCacheModel) {
        this.courseCacheModel = courseCacheModel;
    }
    create(createCourseCacheDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseCacheModel.create(createCourseCacheDto);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseCacheModel.findAll();
        });
    }
    findOne(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield this.courseCacheModel.findByPk(courseId);
            if (!cache) {
                throw new common_1.NotFoundException('Course Cache not found');
            }
            return cache;
        });
    }
    update(courseId, updateCourseCacheDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield this.findOne(courseId);
            return cache.update(updateCourseCacheDto);
        });
    }
    remove(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield this.findOne(courseId);
            yield cache.destroy();
        });
    }
};
exports.CourseCacheService = CourseCacheService;
exports.CourseCacheService = CourseCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(course_cache_entity_1.CourseCache)),
    __metadata("design:paramtypes", [Object])
], CourseCacheService);
//# sourceMappingURL=course-cache.service.js.map