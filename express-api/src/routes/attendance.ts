import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as attendanceController from "../controllers/attendance";

const router = express.Router();

// /api/v1/attendances

// Creates a new attendance record.
// body should contain the specific lecture id and the student id.
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
  "student/:studentId",
  authenticateToken,
  authorizeRoles("student", "professor", "admin", "staff"),
  attendanceController.getAttendanceByStudent
);

//Retrieve attendance records for a specific lecture.
router.get(
  "lecture/:lectureId",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  attendanceController.getAttendanceByLecture
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  attendanceController.updateAttendance
);

// Deletes an attendance record.
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  attendanceController.deleteAttendance
);

export default router;
