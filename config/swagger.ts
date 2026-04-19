import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation for my Express project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      {
        name: 'users',
        description: 'User management'
      },
      {
        name: 'login',
        description: 'Authentication'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            username: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john@example.com' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' }
          }
        }
      }
    },
  },
  apis: ['./routes/*.ts'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
