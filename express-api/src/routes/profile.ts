import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as profileController from "../controllers/profile";

const router = express.Router();

// ✅
router.get("/", authenticateToken, profileController.getProfile);

// ✅
router.post("/create", authenticateToken, profileController.createProfile);

// ✅
router.put("/update", authenticateToken, profileController.updateProfile);

// ✅
router.delete("/delete", authenticateToken, profileController.deleteProfile);

export default router;
