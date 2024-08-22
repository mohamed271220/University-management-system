import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as timetableController from "../controllers/timetable";

const router = express.Router();

// /api/v1/timetables

// get student timetable
router.get(
  "/students/:studentId/:semesterId",
  authenticateToken,
  timetableController.getStudentTimetable
);

// get professor timetable
router.get(
  "/professors/:professorId",
  authenticateToken,
  timetableController.getProfessorTimetable
);

// get the timetable for a department
router.get(
  "/departments/:departmentId",
  authenticateToken,
  timetableController.getDepartmentTimetable
);

// get the timetable for a hall
router.get(
  "/halls/:hallId",
  authenticateToken,
  timetableController.getHallTimetable
);

// get the timetable for a certain class (student year) in a department
router.get(
  "/departments/:departmentId/years",
  authenticateToken,
  timetableController.getDepartmentYearTimetable
);
export default router;
