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
const studentYearController = __importStar(require("../controllers/studentYear"));
const studentYearValidator_1 = require("../middleware/validators/studentYearValidator");
const router = express_1.default.Router();
// /api/v1/studentYears
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), studentYearValidator_1.validateCreateStudentYear, studentYearController.createStudentYear);
router.get("/allStudentYears", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), studentYearController.getAllStudentYears);
//get all student years records by student id
router.get("/student/:studentId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), studentYearController.getYearRecordsByStudent);
router.put("/:studentYearId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), studentYearValidator_1.validateUpdateStudentYear, studentYearController.updateStudentYear);
router.delete("/:studentYearId", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin", "staff"), studentYearController.deleteStudentYear);
exports.default = router;
