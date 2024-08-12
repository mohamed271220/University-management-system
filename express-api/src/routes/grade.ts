import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as gradeController from "../controllers/grade";

const router = express.Router();

// /api/v1/grades

router.post(
  "/",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  gradeController.createGrade
);
router.get("/allGrades", authenticateToken, gradeController.getAllGrades);
router.get("/:id", authenticateToken, gradeController.getGradeById);
router.get(
  "/student/:id",
  authenticateToken,
  gradeController.getGradesByStudent
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("professor", "admin"),
  gradeController.updateGrade
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  gradeController.deleteGrade
);

export default router;
