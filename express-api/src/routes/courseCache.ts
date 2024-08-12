import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as courseCacheController from "../controllers/courseCache";

const router = express.Router();

// /api/v1/courseCaches

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseCacheController.createCourseCache
);
router.get("/:id", courseCacheController.getCourseCacheById);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseCacheController.updateCourseCache
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseCacheController.deleteCourseCache
);

export default router;