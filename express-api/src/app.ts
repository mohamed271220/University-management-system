import express, { NextFunction, Request, Response } from "express";
import dbConnection from "./config/database";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

dotenv.config();

import "./models"; // Import the models and relationships
import { authenticateToken } from "./middleware/authMiddleware";
import { authorizeRoles } from "./middleware/roleMiddleware";

// routes
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import userRoutes from "./routes/user";
import courseRouter from "./routes/course";
import departmentRouter from "./routes/department";
import professorCourseRouter from "./routes/professorCourse";
import studentCourseRouter from "./routes/studentCourse";
import semesterRouter from "./routes/semester";
import studentYearRouter from "./routes/studentYear";
import hallRouter from "./routes/hall";
import lectureRouter from "./routes/lecture";
import timetableRouter from "./routes/timetable";
import attendanceRouter from "./routes/attendance";

import swaggerRouter, { swaggerSpec } from "./config/swagger";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());

dbConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return dbConnection.sync(); // This will create the tables in your database
  })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/professorCourses", professorCourseRouter);
app.use("/api/v1/studentCourses", studentCourseRouter);
app.use("/api/v1/semesters", semesterRouter);
app.use("/api/v1/studentYears", studentYearRouter);
app.use("/api/v1/halls", hallRouter);
app.use("/api/v1/lectures", lectureRouter);
app.use("/api/v1/timetables", timetableRouter);
app.use("/api/v1/attendances", attendanceRouter);


// Swagger docs route
app.use("/api/v1/official-docs/express-api-docs", swaggerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
