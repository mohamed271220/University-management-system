import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as timetableController from "../controllers/timetable";

const router = express.Router();

// /api/v1/timetables

// Create a new timetable entry.
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  timetableController.createTimetable
);
router.get(
  "/allTimetables",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  timetableController.getAllTimetables
);

router.get(
  "/departments/:departmentId",
  authenticateToken,
  timetableController.getTimetableByDepartment
);
// student or staff gets the timetable by student id (but the id should match the logged user if it's a student)
router.get(
  "/student/:studentId",
  authenticateToken,
  timetableController.getTimetableByStudent
);
router.get(
  "/professors/:professorId",
  authenticateToken,
  timetableController.getTimetableByProfessor
);
router.get(
  "halls/:hallId",
  authenticateToken,
  timetableController.getTimetableByHall
);
router.get(
  "/lectures/:lectureId",
  authenticateToken,
  timetableController.getTimetableByLecture
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  timetableController.updateTimetable
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  timetableController.deleteTimetable
);

export default router;
