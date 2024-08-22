import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

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

const swaggerSpec = swaggerJsdoc(options);

const swaggerRouter = Router();
swaggerRouter.use('/express-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
