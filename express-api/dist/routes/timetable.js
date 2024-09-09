"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const timetableController = __importStar(require("../controllers/timetable"));
const cachingMiddleware_1 = __importDefault(require("../middleware/cachingMiddleware"));
const router = express_1.default.Router();
// /api/v1/timetables
// get student timetable
router.get("/students/:studentId/:semesterId", authMiddleware_1.authenticateToken, cachingMiddleware_1.default, timetableController.getStudentTimetable);
// get professor timetable
router.get("/professors/:professorId", authMiddleware_1.authenticateToken, cachingMiddleware_1.default, timetableController.getProfessorTimetable);
// get the timetable for a department
router.get("/departments/:departmentId", authMiddleware_1.authenticateToken, cachingMiddleware_1.default, timetableController.getDepartmentTimetable);
// get the timetable for a hall
router.get("/halls/:hallId", authMiddleware_1.authenticateToken, cachingMiddleware_1.default, timetableController.getHallTimetable);
// get the timetable for a certain class (student year) in a department
router.get("/departments/:departmentId/years", authMiddleware_1.authenticateToken, cachingMiddleware_1.default, timetableController.getDepartmentYearTimetable);
exports.default = router;
