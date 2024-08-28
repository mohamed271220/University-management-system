import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as lectureController from "../controllers/lecture";

const router = express.Router();

// /api/v1/lectures

router.post(
  "/",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureController.createLecture
);

// TODOs add day based filters
router.get(
  "/allLectures",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureController.getAllLectures
);

router.get("/:lectureId", authenticateToken, lectureController.getLectureById);

router.put(
  "/:lectureId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureController.updateLecture
);

router.delete(
  "/:lectureId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureController.deleteLecture
);

//  Retrieve attendance records for a specific lecture by its LECTUREID.
router.get(
  "/:lectureId/attendance",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureController.getAttendanceByLecture
);

// Archive a lecture by its LECTUREID.
router.put(
  "/:lectureId/archive",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureController.archiveLecture
);

// Retrieve historical records for a specific lecture by its LECTUREID.
router.get(
  "/:lectureId/archive/history",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureController.getHistoryByLecture
);

export default router;
