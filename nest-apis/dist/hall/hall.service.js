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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallService = void 0;
const common_1 = require("@nestjs/common");
const hall_entity_1 = require("./hall.entity");
const sequelize_1 = require("@nestjs/sequelize");
const department_entity_1 = require("../department/department.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
const uuid_1 = require("uuid");
const sequelize_2 = require("sequelize");
let HallService = class HallService {
    constructor(hallModel, departmentModel, lectureModel) {
        this.hallModel = hallModel;
        this.departmentModel = departmentModel;
        this.lectureModel = lectureModel;
    }
    createHall(createHallDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { departmentId } = createHallDto, hallData = __rest(createHallDto, ["departmentId"]);
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            return this.hallModel.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, hallData), { departmentId }));
        });
    }
    getAllHalls() {
        return __awaiter(this, arguments, void 0, function* (search = '', limit = 10, offset = 0) {
            const { count, rows: halls } = yield this.hallModel.findAndCountAll({
                raw: true,
                nest: true,
                where: {
                    name: {
                        [sequelize_2.Op.iLike]: `%${search}%`,
                    },
                },
                limit,
                offset,
            });
            const totalPages = Math.ceil(count / limit);
            const currentPage = Math.ceil(offset / limit) + 1;
            const hasNextPage = currentPage < totalPages;
            const hasPreviousPage = currentPage > 1;
            const pagination = {
                totalItems: count,
                itemsPerPage: limit,
                currentPage: currentPage,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage,
                nextPage: hasNextPage ? currentPage + 1 : null,
                previousPage: hasPreviousPage ? currentPage - 1 : null,
            };
            if (!halls.length) {
                throw new common_1.NotFoundException('No halls found');
            }
            return { halls, pagination };
        });
    }
    getHallById(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId, {
                raw: true,
                nest: true,
                include: [
                    {
                        model: department_entity_1.Department,
                        as: 'department',
                    },
                ],
            });
            if (!hall) {
                throw new common_1.NotFoundException('Hall not found');
            }
            return hall;
        });
    }
    getHallLectures(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new common_1.NotFoundException('Hall not found');
            }
            const lectures = yield this.lectureModel.findAll({
                raw: true,
                nest: true,
                where: {
                    hallId,
                },
                include: [this.hallModel],
            });
            return lectures;
        });
    }
    updateHall(hallId, updateHallDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new common_1.NotFoundException('Hall not found');
            }
            const { departmentId } = updateHallDto, hallData = __rest(updateHallDto, ["departmentId"]);
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            return hall.update(Object.assign(Object.assign({}, hallData), { departmentId }));
        });
    }
    deleteHall(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new common_1.NotFoundException('Hall not found');
            }
            yield hall.destroy();
        });
    }
};
exports.HallService = HallService;
exports.HallService = HallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(hall_entity_1.Hall)),
    __param(1, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __param(2, (0, sequelize_1.InjectModel)(lecture_entity_1.Lecture)),
    __metadata("design:paramtypes", [Object, Object, Object])
], HallService);
//# sourceMappingURL=hall.service.js.map