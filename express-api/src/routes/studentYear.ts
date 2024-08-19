import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as studentYearController from "../controllers/studentYear";

const router = express.Router();

// /api/v1/studentYears

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.createStudentYear
);

router.get(
  "/allStudentYears",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.getAllStudentYears
);

//get all student years records by student id
router.get(
  "/student/:studentId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.getYearRecordsByStudent
);

router.put(
  "/:studentYearId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.updateStudentYear
);

router.delete(
  "/:studentYearId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.deleteStudentYear
);

export default router;
