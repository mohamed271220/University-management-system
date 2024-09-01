import express from "express";
import * as authController from "../controllers/auth";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validators/authValidators";
const router = express.Router();

router.get("/profile", authenticateToken, authController.getProfile);

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateLogin, authController.login);

router.get("/logout", authController.logout);

router.get(
  "/validate-token",
  authenticateToken,
  authController.validateSession
);

router.get("/refresh-token", authController.refreshToken);

// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);

export default router;
