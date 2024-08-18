import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as profileController from "../controllers/profile";
import {
  updateProfileValidation,
  validateProfile,
} from "../middleware/validators/profileValidators";

const router = express.Router();

// ✅
router.get("/", authenticateToken, profileController.getProfile);

// ✅
router.post(
  "/create",
  authenticateToken,
  validateProfile,
  profileController.createProfile
);

// ✅
router.put(
  "/update",
  authenticateToken,
  updateProfileValidation,
  profileController.updateProfile
);

// ✅
router.delete("/delete", authenticateToken, profileController.deleteProfile);

export default router;
