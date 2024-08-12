import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as lectureHistoryController from "../controllers/lectureHistory";

const router = express.Router();

// /api/v1/lectureHistories

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureHistoryController.createLectureHistory
);
router.get(
  "/allLectureHistories",
  authorizeRoles("admin", "staff"),
  lectureHistoryController.getAllLectureHistories
);
// Retrieve historical records for a specific lecture by its ID.
router.get(
  "/:lectureHistoryId",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  lectureHistoryController.getLectureHistoryById
);
router.put(
  "/:lectureHistoryId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureHistoryController.updateLectureHistory
);
router.delete(
  "/:lectureHistoryId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  lectureHistoryController.deleteLectureHistory
);

export default router;
