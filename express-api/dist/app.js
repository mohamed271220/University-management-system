"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./models"); // Import the models and relationships
const authMiddleware_1 = require("./middleware/authMiddleware");
const roleMiddleware_1 = require("./middleware/roleMiddleware");
// routes
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const user_1 = __importDefault(require("./routes/user"));
const course_1 = __importDefault(require("./routes/course"));
const department_1 = __importDefault(require("./routes/department"));
const professorCourse_1 = __importDefault(require("./routes/professorCourse"));
const studentCourse_1 = __importDefault(require("./routes/studentCourse"));
const semester_1 = __importDefault(require("./routes/semester"));
const studentYear_1 = __importDefault(require("./routes/studentYear"));
const swagger_1 = __importDefault(require("./config/swagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
database_1.default
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
    return database_1.default.sync(); // This will create the tables in your database
})
    .then(() => {
    console.log("Database synchronized successfully.");
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/profile", profile_1.default);
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/courses", course_1.default);
app.use("/api/v1/departments", department_1.default);
app.use("/api/v1/professorCourses", professorCourse_1.default);
app.use("/api/v1/studentCourses", studentCourse_1.default);
app.use("/api/v1/semesters", semester_1.default);
app.use("/api/v1/studentYears", studentYear_1.default);
app.get("/protected", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)("admin"), (req, res) => {
    res.send("This is a protected route for admin users.");
});
app.use("/api-doc", swagger_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
