import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as semesterController from "../controllers/semester";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.createSemester
);
router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.getAllSemesters
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.getSemesterById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.updateSemester
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.deleteSemester
);

//Retrieve all grades associated with a specific
router.get(
  "/:id/grades",
  authenticateToken,
  semesterController.getSemesterGrades
);
// Retrieve all student enrollments associated with a specific semester.
router.get(
  "/:id/student-courses",
  authenticateToken,
  semesterController.getStudentEnrolledCourses
);

export default router;
