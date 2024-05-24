"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
//import swaggerUi from 'swagger-ui-express';
const yamljs_1 = __importDefault(require("yamljs"));
const baseSwaggerDefinition = yamljs_1.default.load('src/api-docs/merged.api-docs.yaml');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "BeesBoost API",
        version: "0.1.0",
        description: "API built for BeesBoost website"
    },
    ...baseSwaggerDefinition
};
const options = {
    swaggerDefinition,
    apis: []
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
