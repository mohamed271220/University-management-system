import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as attendanceController from "../controllers/attendance";

const router = express.Router();

// /api/v1/attendances

// Creates a new attendance record.
router.post(
  "/",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  attendanceController.createAttendance
);

// Gets all attendance records.
router.get(
  "/allAttendances",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  attendanceController.getAllAttendances
);

// Retrieve attendance records for a specific student.
router.get(
  "/students/:studentId",
  authenticateToken,
  authorizeRoles("student", "professor", "admin", "staff"),
  attendanceController.getAttendanceByStudent
);

//Retrieve attendance records for a specific lecture.
router.get(
  "/lectures/:lectureId",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  attendanceController.getAttendanceByLecture
);

// Retrieve attendance records for a student in a specific lecture.
router.get(
  "/students/:studentId/lectures/:lectureId",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  attendanceController.getAttendanceByStudentAndLecture
);


router.put(
  "/:attendanceRecordId/status",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  attendanceController.updateAttendanceStatus
);

// Deletes an attendance record.
router.delete(
  "/:attendanceRecordId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  attendanceController.deleteAttendance
);

export default router;
