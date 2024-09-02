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

router.get("/:courseId", courseCacheController.getCourseCacheById);

router.get("/", courseCacheController.getAllCourseCaches);

// Get all course cache entries for a specific course
router.get(
  "/courses/:courseId",
  courseCacheController.getCourseCacheByCourse
);

// Get all course cache entries for a specific department
router.get(
  "/departments/:departmentId",
  courseCacheController.getCourseCacheByDepartment
);

router.put(
  "/:courseId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseCacheController.updateCourseCache
);
router.delete(
  "/:courseId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseCacheController.deleteCourseCache
);

export default router;