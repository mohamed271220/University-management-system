import AuditLog from "../models/AuditLog";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../utils/CustomError";

export class AuditLogService {
  constructor(private auditLogRepository: typeof AuditLog = AuditLog) {}

  async createAuditLog(data: {
    action: "INSERT" | "UPDATE" | "DELETE";
    recordId: string;
    oldData?: Record<string, any>;
    newData?: Record<string, any>;
    changedAt?: Date;
    tableName: string;
    changedBy: string;
  }) {
    return this.auditLogRepository.create({
      id: uuidv4(),
      ...data,
    });
  }

  async getAllAuditLogs() {
    return this.auditLogRepository.findAll();
  }

  async getAuditLogById(id: string) {
    const auditLog = await this.auditLogRepository.findByPk(id);
    if (!auditLog) {
      throw new CustomError("Audit log not found");
    }
    return auditLog;
  }

  async getAuditLogsByUserId(userId: string) {
    const auditLogs = await this.auditLogRepository.findAll({
      where: {
        changedBy: userId,
      },
    });
    if (!auditLogs) {
      throw new CustomError("Audit logs not found");
    }
    return auditLogs;
  }

  async deleteAuditLog(id: string) {
    const auditLog = await this.auditLogRepository.findByPk(id);
    if (!auditLog) {
      throw new CustomError("Audit log not found");
    }
    await auditLog.destroy();
    return auditLog;
  }
}
