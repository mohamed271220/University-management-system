"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
// Define Swagger options
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "University Management System API",
        version: "1.0.0",
        description: "API documentation for the University Management System",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
    components: {},
};
// Set up options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: [
        path_1.default.join("src", "swagger-docs", "*.yml"),
        // "src/routes/*.ts",
        // "src/models/*.ts",
        // "src/interfaces/*.ts",
        // "src/controllers/*.ts",
    ],
};
// Initialize swagger-jsdoc
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;
// Set up Swagger router
const swaggerRouter = (0, express_1.Router)();
swaggerRouter.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = swaggerRouter;
