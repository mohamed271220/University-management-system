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
exports.deleteAttendance = exports.updateAttendance = exports.getAttendanceByLecture = exports.getAttendanceByStudent = exports.getAllAttendances = exports.createAttendance = void 0;
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.createAttendance = createAttendance;
const getAllAttendances = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllAttendances = getAllAttendances;
const getAttendanceByStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAttendanceByStudent = getAttendanceByStudent;
const getAttendanceByLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAttendanceByLecture = getAttendanceByLecture;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateAttendance = updateAttendance;
const deleteAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteAttendance = deleteAttendance;
