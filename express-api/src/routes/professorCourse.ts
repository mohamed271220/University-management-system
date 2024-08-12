import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as professorCourseController from "../controllers/professorCourse";

const router = express.Router();

// api/v1/professorCourses

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.createProfessorCourse
);
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

// Retrieve all courses associated with a specific professor.
router.get(
  "/professor/:professorId",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  professorCourseController.getAllProfessorCourses
);

// Retrieve all professors associated with a specific course.
router.get(
  "/course/:courseId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.getAllProfessorsByCourse
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.updateProfessorCourse
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  professorCourseController.deleteProfessorCourse
);
export default router;
