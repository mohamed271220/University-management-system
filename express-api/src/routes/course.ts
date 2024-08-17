import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as courseController from "../controllers/course";

const router = express.Router();

// /api/v1/courses

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseController.createCourse
);
router.get("/allCourses", authenticateToken, courseController.getAllCourses);
router.get("/:id", authenticateToken, courseController.getCourseById);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseController.updateCourse
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  courseController.deleteCourse
);

router.get(
  "/:id/lectures",
  authenticateToken,
  courseController.getLecturesByCourseId
);

export default router;
