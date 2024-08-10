import { Request } from "express";

export interface JwtPayload {
  id: string;
  role: string;
}

export interface userRequest extends Request {
    user?: {
      id: string;
      role: string;
    };
  }