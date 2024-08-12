import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as auditLogController from "../controllers/auditLog";

const router = express.Router();

// /api/v1/auditLogs

router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  auditLogController.getAllAuditLogs
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  auditLogController.getAuditLogById
);
router.get(
  "/user/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  auditLogController.getAuditLogsByUser
);

export default router;
