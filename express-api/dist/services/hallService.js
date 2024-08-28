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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallService = void 0;
const Department_1 = __importDefault(require("../models/Department"));
const Hall_1 = __importDefault(require("../models/Hall"));
const uuid_1 = require("uuid");
const Lecture_1 = __importDefault(require("../models/Lecture"));
const CustomError_1 = require("../utils/CustomError");
class HallService {
    constructor(hallModel = Hall_1.default) {
        this.hallModel = hallModel;
    }
    createHall(name, isLab, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield Department_1.default.findByPk(departmentId);
            if (!department) {
                throw new CustomError_1.CustomError("Department not found", 404);
            }
            const hall = yield this.hallModel.create({
                id: (0, uuid_1.v4)(),
                name,
                isLab,
                departmentId,
            });
            return hall;
        });
    }
    getAllHalls() {
        return __awaiter(this, void 0, void 0, function* () {
            const halls = yield this.hallModel.findAll();
            return halls;
        });
    }
    getHallById(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new CustomError_1.CustomError("Hall not found", 404);
            }
            return hall;
        });
    }
    updateHall(hallId, name, isLab, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new CustomError_1.CustomError("Hall not found", 404);
            }
            if (name)
                hall.name = name;
            if (isLab !== undefined)
                hall.isLab = isLab;
            if (departmentId) {
                const department = yield Department_1.default.findByPk(departmentId);
                if (!department) {
                    throw new CustomError_1.CustomError("Department not found", 404);
                }
                hall.departmentId = departmentId;
            }
            yield hall.save();
            return hall;
        });
    }
    deleteHall(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new CustomError_1.CustomError("Hall not found", 404);
            }
            yield hall.destroy();
            return hall;
        });
    }
    getLecturesByHall(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new CustomError_1.CustomError("Hall not found", 404);
            }
            const lectures = yield Lecture_1.default.findAll({
                where: { hallId },
            });
            return lectures;
        });
    }
}
exports.HallService = HallService;
