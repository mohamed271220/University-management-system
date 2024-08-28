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
const gradeController = __importStar(require("../controllers/grade"));
const router = express_1.default.Router();
// /api/v1/grades
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin"), gradeController.createGrade);
// for administrative purposes
router.get("/allGrades", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("staff", "admin"), gradeController.getAllGrades);
router.get("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("staff", "admin"), gradeController.getGradeById);
// get all grades by student id (if role is student, only return grades for that student)
router.get("/student/:studentId", authMiddleware_1.authenticateToken, gradeController.getGradesByStudent);
// get all grades by student id and semester id
router.get("/student/:studentId/semester/:semesterId", authMiddleware_1.authenticateToken, gradeController.getGradesByStudentAndSemester);
// get all grades by course id
router.get("/course/:courseId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("staff", "admin"), gradeController.getGradesByCourse);
// get all grades by semester id
router.get("/semester/:semesterId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("staff", "admin"), gradeController.getGradesBySemester);
// get all grades for courses taught by professor
router.get("/professor/:professorId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin"), gradeController.getGradesByProfessor);
router.put("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("professor", "admin"), gradeController.updateGrade);
router.delete("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin"), gradeController.deleteGrade);
exports.default = router;
