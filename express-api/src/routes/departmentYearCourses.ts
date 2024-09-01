import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as departmentYearCoursesController from "../controllers/departmentYearCourse";
import {
  addCourseToDepartmentYearValidator,
  deleteCourseForDepartmentYearValidator,
  editCourseForDepartmentYearValidator,
  getCoursesByDepartmentYearValidator,
} from "../middleware/validators/departmentYearCoursesValidator";
const router = Router();

// /api/v1/departmentYearCourses

// add course to department specific year
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  addCourseToDepartmentYearValidator,
  departmentYearCoursesController.addCourseToDepartmentYear
);

// get all courses for a department specific year
router.get(
  "/",
  authenticateToken,
  getCoursesByDepartmentYearValidator,
  departmentYearCoursesController.getCoursesByDepartmentYear
);

// edit course for a department specific year
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  editCourseForDepartmentYearValidator,
  departmentYearCoursesController.editCourseForDepartmentYear
);

// delete course for a department specific year
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCourseForDepartmentYearValidator,
  departmentYearCoursesController.deleteCourseForDepartmentYear
);

export default router;
