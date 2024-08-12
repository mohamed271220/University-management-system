import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as studentCourseController from "../controllers/studentCourse";

const router = express.Router();

// /api/v1/studentCourses

// Enroll a student in a course.
router.post(
  "/enroll/:studentId/courses",
  authenticateToken,
  authorizeRoles("student"),
  studentCourseController.enrollCourses
);
// Retrieve all courses a student is enrolled in.
router.get(
  "/student/:studentId/courses",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.getAllCoursesByStudentId
);

// Retrieve all students enrolled in a course.
router.get(
  "/course/:courseId/students",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.getAllStudentsByCourse
);

// Retrieve a specific student course by its ID.
router.get(
  "/students/:id/courses/:courseId",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.getStudentCourseById
);

// Update a student course by its ID.
router.put(
  "/students/:id/courses/:courseId",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.updateStudentCourse
);
router.delete(
  "/students/:id/courses/:courseId",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.deleteStudentCourse
);

export default router;
