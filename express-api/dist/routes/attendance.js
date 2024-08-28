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
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const attendanceController = __importStar(require("../controllers/attendance"));
const router = express_1.default.Router();
// /api/v1/attendances
// Creates a new attendance record.
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin", "staff"), attendanceController.createAttendance);
// Gets all attendance records.
router.get("/allAttendances", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), attendanceController.getAllAttendances);
// Retrieve attendance records for a specific student.
router.get("/students/:studentId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("student", "professor", "admin", "staff"), attendanceController.getAttendanceByStudent);
//Retrieve attendance records for a specific lecture.
router.get("/lectures/:lectureId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin", "staff"), attendanceController.getAttendanceByLecture);
// Retrieve attendance records for a student in a specific lecture.
router.get("/students/:studentId/lectures/:lectureId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin", "staff"), attendanceController.getAttendanceByStudentAndLecture);
router.put("/:attendanceRecordId/status", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin", "staff"), attendanceController.updateAttendanceStatus);
// Deletes an attendance record.
router.delete("/:attendanceRecordId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), attendanceController.deleteAttendance);
exports.default = router;
