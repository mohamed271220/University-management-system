import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as studentCourseController from "../controllers/studentCourse";
import {
  enrollCoursesValidation,
  updateStudentCourseValidation,
} from "../middleware/validators/studentCourseValidators";

const router = express.Router();

// /api/v1/studentCourses

// Enroll a student in a course.
router.post(
  "/enroll/:studentId/courses",
  authenticateToken,
  authorizeRoles("student", "admin"),
  enrollCoursesValidation,
  studentCourseController.enrollCourses
);

// Retrieve all courses a student is enrolled in.
router.get(
  "/students/:studentId/courses",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.getAllCoursesByStudentId
);

// Retrieve all students enrolled in a course.
router.get(
  "/courses/:courseId/students",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.getAllStudentsByCourse
);

// Retrieve a specific student course by its ID.
router.get(
  "/students/:studentId/courses/:courseId",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.getStudentCourseById
);

// Update a student course by its ID (change it's semester).
router.put(
  "/students/:studentId/courses/:courseId/semester",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  updateStudentCourseValidation,
  studentCourseController.updateStudentCourse
);

// unenroll a student from a course.
router.delete(
  "/students/:studentId/courses/:courseId",
  authenticateToken,
  authorizeRoles("student", "admin", "staff"),
  studentCourseController.deleteStudentCourse
);

export default router;
