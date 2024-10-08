"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const hallController = __importStar(require("../controllers/hall"));
const hallValidators_1 = require("../middleware/validators/hallValidators");
const router = express_1.default.Router();
// /api/v1/halls
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), hallValidators_1.createHallValidator, hallController.createHall);
router.get("/allHalls", authMiddleware_1.authenticateToken, hallController.getAllHalls);
router.get("/:hallId", authMiddleware_1.authenticateToken, hallController.getHallById);
router.put("/:hallId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), hallValidators_1.updateHallValidator, hallController.updateHall);
router.delete("/:hallId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), hallController.deleteHall);
// Retrieve all lectures scheduled in a specific hall by its id.
router.get("/:hallId/lectures", authMiddleware_1.authenticateToken, hallController.getLecturesByHall);
exports.default = router;
