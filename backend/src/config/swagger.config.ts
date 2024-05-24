import swaggerJsdoc from 'swagger-jsdoc';
//import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const baseSwaggerDefinition: object = YAML.load('src/api-docs/merged.api-docs.yaml');
  
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: "BeesBoost API",
    version: "0.1.0",
    description: "API built for BeesBoost website"
  },
  ...baseSwaggerDefinition
};

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  apis: []
};
  
const swaggerSpec = swaggerJsdoc(options);
  
export default swaggerSpec;