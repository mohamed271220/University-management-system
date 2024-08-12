import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as studentYearController from "../controllers/studentYear";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.createStudentYear
);

router.get("/", authenticateToken, studentYearController.getAllStudentYears);

router.get(
  "/student/:studentId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.getYearRecordsByStudent
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.updateStudentYear
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  studentYearController.deleteStudentYear
);

export default router;
