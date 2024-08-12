"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = require("express");
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'University Management System API',
        version: '1.0.0',
        description: 'API documentation for the University Management System',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Path to your API routes
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerRouter = (0, express_1.Router)();
swaggerRouter.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = swaggerRouter;
