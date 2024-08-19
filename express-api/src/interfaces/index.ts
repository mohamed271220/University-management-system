import { Request } from "express";
import Course from "../models/Course";
import User from "../models/User";
import Lecture from "../models/Lecture";

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

export interface courseData {
  code: string;
  name: string;
  description: string;
  credits: number;
  departmentId: string;
  professorId: string;
}

export interface departmentData {
  name: string;
  code: string;
}

export interface CourseWithProfessors extends Course {
  professors?: User[];
}

export interface CourseWithLectures extends Course {
  Lectures?: Lecture[];
}

export enum Year {
  "1st Year" = "1st Year",
  "2nd Year" = "2nd Year",
  "3rd Year" = "3rd Year",
  "4th Year" = "4th Year",
}

export interface studentYearData {
  year: Year;
  studentId: string;
  effectiveDate: Date;
}