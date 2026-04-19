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
  },
  apis: ['./routes/*.ts'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
