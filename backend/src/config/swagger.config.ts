import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'BeesBoost API',
      version: '0.1.0',
      description: 'API built for BeesBoost website (Méline <3)',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      schemas: {
        Student: {
          type: 'object',
          required: ['username', 'role', 'email', 'name', 'firstname', 'school', 'occupation', 'location'],
          properties: {
            username: { type: 'string', example: 'johndoe' },
            profile_pic: { type: 'string', example: 'http://example.com/profile.jpg' },
            role: { type: 'string', example: 'student' },
            email: { type: 'string', example: 'john.doe@example.com' },
            name: { type: 'string', example: 'John' },
            firstname: { type: 'string', example: 'Doe' },
            school: { type: 'string', example: 'University of Example' },
            occupation: { type: 'string', example: 'Student' },
            location: { type: 'string', example: 'City, Country' },
            contact_info: { type: 'object', additionalProperties: true },
            formation: { type: 'array', items: { type: 'object', additionalProperties: true } },
            experience: { type: 'array', items: { type: 'object', additionalProperties: true } },
            skills: { type: 'array', items: { type: 'object', additionalProperties: true } },
            certification: { type: 'array', items: { type: 'object', additionalProperties: true } },
            languages: { type: 'array', items: { type: 'object', additionalProperties: true } },
          }
        }
      }
    },
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  export default swaggerSpec;