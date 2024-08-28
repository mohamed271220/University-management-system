import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import * as hallController from "../controllers/hall";
import {
  createHallValidator,
  updateHallValidator,
} from "../middleware/validators/hallValidators";

const router = express.Router();

// /api/v1/halls

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  createHallValidator,
  hallController.createHall
);

router.get("/allHalls", authenticateToken, hallController.getAllHalls);
router.get("/:hallId", authenticateToken, hallController.getHallById);
router.put(
  "/:hallId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  updateHallValidator,
  hallController.updateHall
);
router.delete(
  "/:hallId",
  authenticateToken,
  authorizeRoles("admin", "staff"),
  hallController.deleteHall
);

// Retrieve all lectures scheduled in a specific hall by its id.
router.get(
  "/:hallId/lectures",
  authenticateToken,
  hallController.getLecturesByHall
);

export default router;
