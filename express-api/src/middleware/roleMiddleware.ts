import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../interfaces";

interface userRequest extends Request {
  user?: JwtPayload;
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: userRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    console.log(user.role);
    if (!allowedRoles.includes(user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
