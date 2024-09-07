"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuditLog = exports.getAuditLogsByUser = exports.getAuditLogById = exports.getAllAuditLogs = exports.createAuditLog = void 0;
const auditLogService_1 = require("../services/auditLogService");
const auditLogService = new auditLogService_1.AuditLogService();
const createAuditLog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { action, recordId, oldData, newData, changedAt, tableName } = req.body;
        const auditLog = yield auditLogService.createAuditLog({
            action,
            recordId,
            oldData,
            newData,
            changedAt,
            tableName,
            changedBy: (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "",
        });
        res.status(201).json({ message: "Audit log created successfully", auditLog });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.createAuditLog = createAuditLog;
const getAllAuditLogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auditLogs = yield auditLogService.getAllAuditLogs();
        res.status(200).json({ message: "Audit logs fetched successfully", auditLogs });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.getAllAuditLogs = getAllAuditLogs;
const getAuditLogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const auditLog = yield auditLogService.getAuditLogById(id);
        res.status(200).json({ message: "Audit log fetched successfully", auditLog });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.getAuditLogById = getAuditLogById;
const getAuditLogsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const auditLogs = yield auditLogService.getAuditLogsByUserId(userId);
        res.status(200).json({ message: "Audit logs for user fetched successfully", auditLogs });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.getAuditLogsByUser = getAuditLogsByUser;
const deleteAuditLog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const auditLog = yield auditLogService.deleteAuditLog(id);
        res.status(200).json({ message: "audit log deleted", auditLog });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.deleteAuditLog = deleteAuditLog;
