import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as gradeController from "../controllers/grade";
import {
  createGradeValidation,
  getGradeByIdValidation,
  updateGradeValidation,
} from "../middleware/validators/gradeValidator";

const router = express.Router();

// /api/v1/grades

router.post(
  "/",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  createGradeValidation,
  gradeController.createGrade
);

// for administrative purposes
router.get(
  "/allGrades",
  authenticateToken,
  authorizeRoles("staff", "admin"),
  gradeController.getAllGrades
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("staff", "admin"),
  getGradeByIdValidation,
  gradeController.getGradeById
);

// get all grades by student id (if role is student, only return grades for that student)
router.get(
  "/students/:studentId",
  authenticateToken,
  gradeController.getGradesByStudent
);

// get all grades by student id and semester id
router.get(
  "/students/:studentId/semesters/:semesterId",
  authenticateToken,
  gradeController.getGradesByStudentAndSemester
);

// get all grades by course id
router.get(
  "/courses/:courseId",
  authenticateToken,
  authorizeRoles("staff", "admin"),
  gradeController.getGradesByCourse
);

// get all grades by semester id
router.get(
  "/semesters/:semesterId",
  authenticateToken,
  authorizeRoles("staff", "admin"),
  gradeController.getGradesBySemester
);

// get all grades for courses taught by professor
router.get(
  "/professors/:professorId",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  gradeController.getGradesByProfessor
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  updateGradeValidation,
  gradeController.updateGrade
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  gradeController.deleteGrade
);

export default router;
