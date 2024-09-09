import { NextFunction, Request, Response } from "express";
import { AuditLogService } from "../services/auditLogService";
import { userRequest } from "../interfaces";

const auditLogService = new AuditLogService();

export const createAuditLog = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { action, recordId, oldData, newData, changedAt, tableName } =
      req.body;
    const auditLog = await auditLogService.createAuditLog({
      action,
      recordId,
      oldData,
      newData,
      changedAt,
      tableName,
      changedBy: req.user?.id ?? "",
    });
    res.status(201).json({message: "Audit log created successfully",auditLog});
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const getAllAuditLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auditLogs = await auditLogService.getAllAuditLogs();
    res.status(200).json({message:"Audit logs fetched successfully",auditLogs});
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const getAuditLogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const auditLog = await auditLogService.getAuditLogById(id);
    res.status(200).json({message:"Audit log fetched successfully",auditLog});
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const getAuditLogsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const auditLogs = await auditLogService.getAuditLogsByUserId(userId);
    res.status(200).json({message:"Audit logs for user fetched successfully",auditLogs});
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const deleteAuditLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const auditLog = await auditLogService.deleteAuditLog(id);
    res.status(200).json({message:"audit log deleted",auditLog});
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};
