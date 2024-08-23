import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as courseController from "../controllers/course";
import {
  validateCourse,
  validateUpdateCourse,
} from "../middleware/validators/courseValidators";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  validateCourse,
  courseController.createCourse
);

router.get("/allCourses", authenticateToken, courseController.getAllCourses);


router.get("/:id", authenticateToken, courseController.getCourseById);


router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  validateUpdateCourse,
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
