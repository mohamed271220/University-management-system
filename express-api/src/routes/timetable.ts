import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as timetableController from "../controllers/timetable";
import cacheMiddleware from "../middleware/cachingMiddleware";

const router = express.Router();

// /api/v1/timetables

// get student timetable
router.get(
  "/students/:studentId/:semesterId",
  authenticateToken,
  cacheMiddleware,
  timetableController.getStudentTimetable
);

// get professor timetable
router.get(
  "/professors/:professorId",
  authenticateToken,
  cacheMiddleware,
  timetableController.getProfessorTimetable
);

// get the timetable for a department
router.get(
  "/departments/:departmentId",
  authenticateToken,
  cacheMiddleware,
  timetableController.getDepartmentTimetable
);

// get the timetable for a hall
router.get(
  "/halls/:hallId",
  authenticateToken,
  cacheMiddleware,
  timetableController.getHallTimetable
);

// get the timetable for a certain class (student year) in a department
router.get(
  "/departments/:departmentId/years",
  authenticateToken,
  cacheMiddleware,
  timetableController.getDepartmentYearTimetable
);
export default router;
