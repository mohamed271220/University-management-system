import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as profileController from "../controllers/profile";
import {
  updateProfileValidation,
  validateProfile,
} from "../middleware/validators/profileValidators";

const router = express.Router();

// User gets their profile
router.get("/", authenticateToken, profileController.getProfile);

// User creates their profile
router.post(
  "/create",
  authenticateToken,
  validateProfile,
  profileController.createProfile
);

// User updates their profile
router.put(
  "/update",
  authenticateToken,
  updateProfileValidation,
  profileController.updateProfile
);

// User deletes their profile
router.delete("/delete", authenticateToken, profileController.deleteProfile);

export default router;
