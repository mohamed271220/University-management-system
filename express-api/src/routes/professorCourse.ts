import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as professorCourseController from "../controllers/professorCourse";
import { createProfessorCourseValidation } from "../middleware/validators/professorCourseValidators";

const router = express.Router();

// api/v1/professorCourses

// Add Professor to Course
router.post(
  "/courses/:courseId/professors/:professorId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  createProfessorCourseValidation,
  professorCourseController.createProfessorCourse
);

// Remove Professor from Course
router.delete(
  "/courses/:courseId/professors/:professorId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.deleteProfessorCourse
);

// Retrieve all courses associated with a specific professor. ✅
router.get(
  "/allProfessorCourses",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.getAllCourses
);

// Retrieve a specific professor course by its ID.
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.getProfessorCourseById
);

// Retrieve all courses associated with a specific professor. ✅
router.get(
  "/professors/:professorId/courses",
  authenticateToken,
  professorCourseController.getAllProfessorCourses
);

// Retrieve all professors associated with a specific course. ✅
router.get(
  "/courses/:courseId/professors",
  authenticateToken,
  professorCourseController.getAllProfessorsByCourse
);

export default router;
