import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as departmentController from "../controllers/department";

const router = express.Router();

// /api/v1/departments

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  departmentController.createDepartment
);
router.get(
  "/allDepartments",
  authenticateToken,
  departmentController.getAllDepartments
);
router.get("/:id", authenticateToken, departmentController.getDepartmentById);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  departmentController.updateDepartment
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  departmentController.deleteDepartment
);
router.get(
  "/:id/course",
  authenticateToken,
  departmentController.getCoursesByDepartment
);
router.get(
  "/:id/halls",
  authenticateToken,
  departmentController.getHallsByDepartment
);

export default router;
