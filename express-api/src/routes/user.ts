import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as userController from "../controllers/user";
import { updateUserValidator } from "../middleware/validators/userValidators";

const router = express.Router();

// /api/v1/users

// ✅
router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  userController.getAllUsers
);

// ✅
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("professor", "admin", "staff"),
  userController.getUserById
);

// ✅
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("student", "professor", "admin", "staff"),
  updateUserValidator,
  userController.updateUser
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  userController.deleteUser
);

export default router;
