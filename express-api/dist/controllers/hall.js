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
exports.getLecturesByHall = exports.deleteHall = exports.updateHall = exports.getHallById = exports.getAllHalls = exports.createHall = void 0;
const hallService_1 = require("../services/hallService");
const CustomError_1 = require("../utils/CustomError");
const hallService = new hallService_1.HallService();
const createHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isLab, departmentId } = req.body;
        if (!name || isLab === undefined || !departmentId) {
            throw new CustomError_1.CustomError("Please provide all required fields", 400);
        }
        const hall = yield hallService.createHall(name, isLab, departmentId);
        res.status(201).json({ message: "Hall created", hall });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createHall = createHall;
const getAllHalls = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const halls = yield hallService.getAllHalls();
        res.status(200).json({ message: "All halls", halls });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllHalls = getAllHalls;
const getHallById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hall = yield hallService.getHallById(req.params.hallId);
        if (!hall) {
            throw new CustomError_1.CustomError("Hall not found", 404);
        }
        res.status(200).json({ message: "Hall found", hall });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getHallById = getHallById;
const updateHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isLab, departmentId } = req.body;
        const hall = yield hallService.updateHall(req.params.hallId, name, isLab, departmentId);
        if (!hall) {
            throw new CustomError_1.CustomError("Hall not found", 404);
        }
        res.status(200).json({ message: "Hall updated", hall });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateHall = updateHall;
const deleteHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hall = yield hallService.deleteHall(req.params.hallId);
        res.status(200).json({ message: "Hall deleted", hall });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteHall = deleteHall;
const getLecturesByHall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lectures = yield hallService.getLecturesByHall(req.params.hallId);
        res.status(200).json({ message: "All lectures", lectures });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getLecturesByHall = getLecturesByHall;
