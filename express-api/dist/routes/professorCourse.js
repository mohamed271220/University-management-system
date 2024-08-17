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
const professorCourseController = __importStar(require("../controllers/professorCourse"));
const router = express_1.default.Router();
// api/v1/professorCourses
// Add Professor to Course
router.post("/courses/:courseId/professors/:professorId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), professorCourseController.createProfessorCourse);
// Remove Professor from Course
router.delete("/courses/:courseId/professors/:professorId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), professorCourseController.deleteProfessorCourse);
// Retrieve all courses associated with a specific professor. ✅
router.get("/allProfessorCourses", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), professorCourseController.getAllCourses);
// Retrieve a specific professor course by its ID.
router.get("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), professorCourseController.getProfessorCourseById);
// Retrieve all courses associated with a specific professor. ✅
router.get("/professors/:professorId/courses", authMiddleware_1.authenticateToken, professorCourseController.getAllProfessorCourses);
// Retrieve all professors associated with a specific course. ✅
router.get("/courses/:courseId/professors", authMiddleware_1.authenticateToken, professorCourseController.getAllProfessorsByCourse);
exports.default = router;
