import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as semesterController from "../controllers/semester";
import {
  validateCreateSemester,
  validateUpdateSemester,
} from "../middleware/validators/semesterValidators";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  validateCreateSemester,
  semesterController.createSemester
);

router.get(
  "/allSemesters",
  authenticateToken,
  semesterController.getAllSemesters
);

router.get(
  "/:semesterId",
  authenticateToken,
  semesterController.getSemesterById
);

router.put(
  "/:semesterId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  validateUpdateSemester,
  semesterController.updateSemester
);

router.delete(
  "/:semesterId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.deleteSemester
);

//Retrieve all grades associated with a specific
router.get(
  "/:semesterId/grades",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.getSemesterGrades
);

// Retrieve all student enrollments associated with a specific semester.
router.get(
  "/:semesterId/student-courses",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  semesterController.getStudentEnrolledCourses
);

export default router;
