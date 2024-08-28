import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Router } from "express";
import path from "path";

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
    path.join("src", "swagger-docs", "*.yml"),
    // "src/routes/*.ts",
    // "src/models/*.ts",
    // "src/interfaces/*.ts",
    // "src/controllers/*.ts",
  ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Set up Swagger router
const swaggerRouter = Router();
swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { swaggerSpec };
export default swaggerRouter;
