import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as hallController from "../controllers/hall";

const router = express.Router();

// /api/v1/halls

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  hallController.createHall
);

router.get("/allHalls", authenticateToken, hallController.getAllHalls);
router.get("/:id", authenticateToken, hallController.getHallById);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  hallController.updateHall
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  hallController.deleteHall
);

// Retrieve all lectures scheduled in a specific hall by its ID.
router.get(
  "/:id/lectures",
  authenticateToken,
  hallController.getLecturesByHall
);

export default router;
