import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as gradeController from "../controllers/grade";

const router = express.Router();

// /api/v1/grades

router.post(
  "/",
  authenticateToken,
  authorizeRoles("professor", "admin"),
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
  gradeController.getGradeById
);

// get all grades by student id (if role is student, only return grades for that student)
router.get(
  "/student/:studentId",
  authenticateToken,
  gradeController.getGradesByStudent
);

// get all grades by student id and semester id
router.get(
  "/student/:studentId/semester/:semesterId",
  authenticateToken,
  gradeController.getGradesByStudentAndSemester
);

// get all grades by course id
router.get(
  "/course/:courseId",
  authenticateToken,
  authorizeRoles("staff", "admin"),
  gradeController.getGradesByCourse
);

// get all grades by semester id
router.get(
  "/semester/:semesterId",
  authenticateToken,
  authorizeRoles("staff", "admin"),
  gradeController.getGradesBySemester
);

// get all grades for courses taught by professor
router.get(
  "/professor/:professorId",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  gradeController.getGradesByProfessor
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  gradeController.updateGrade
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  gradeController.deleteGrade
);

export default router;
