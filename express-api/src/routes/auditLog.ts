import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as auditLogController from "../controllers/auditLog";

const router = express.Router();

// /api/v1/audit-logs

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  auditLogController.createAuditLog
);

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

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  auditLogController.deleteAuditLog
);


router.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  auditLogController.getAuditLogsByUser
);



export default router;
