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
router.get("/allLectures", authenticateToken, lectureController.getAllLectures);
router.get("/:id", authenticateToken, lectureController.getLectureById);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureController.updateLecture
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureController.deleteLecture
);

//  Retrieve attendance records for a specific lecture by its ID.
router.get(
  "/:id/attendance",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureController.getAttendanceByLecture
);

// Retrieve historical records for a specific lecture by its ID.
router.get(
  "/:id/history",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureController.getHistoryByLecture
);

export default router;
