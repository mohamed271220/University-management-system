import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as departmentYearCoursesController from "../controllers/departmentYearCourse";
const router = Router();

// /api/v1/departmentYearCourses

// add course to department specific year
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  departmentYearCoursesController.addCourseToDepartmentYear
);

// get all courses for a department specific year
router.get(
  "/",
  authenticateToken,
  departmentYearCoursesController.getCoursesByDepartmentYear
);

// edit course for a department specific year
router.put(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  departmentYearCoursesController.editCourseForDepartmentYear
);

// delete course for a department specific year
router.delete(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  departmentYearCoursesController.deleteCourseForDepartmentYear
);

export default router;
