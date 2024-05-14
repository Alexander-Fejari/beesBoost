"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const yamljs_1 = __importDefault(require("yamljs"));
// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'BeesBoost API',
//     version: '0.1.0',
//     description: 'API built for BeesBoost website',
//   },
//   servers: [
//     {
//       url: `http://localhost:${port}`,
//       description: 'Local Development Server'
//     },
//     {
//       url: 'https://cinemania.space',
//       description: 'Production Server'
//     }
//   ],
//   components: {
//     schemas: {
//       User: {
//         type: 'object',
//         required: ['username', 'password', 'profile_pic', 'role', 'email', 'is_verified', 'is_active', 'is_connected'],
//         properties: {
//           username: { type: 'string', unique: true },
//           password: { type: 'string' },
//           profile_pic: { type: 'string', default: 'https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg' },
//           role: { type: 'string' },
//           email: { type: 'string', unique: true },
//           is_verified: { type: 'boolean', default: false },
//           is_active: { type: 'boolean', default: true },
//           is_connected: { type: 'boolean', default: false },
//           refresh_token: { type: 'string', default: '' },
//           lastname: { type: 'string' },
//           firstname: { type: 'string' },
//           occupation: { type: 'string' },
//           location: { type: 'string' },
//           registration_date: { type: 'string', format: 'date-time', default: 'Date.now' },
//           deletion_date: { type: 'string', format: 'date-time' },
//           contact_info: {
//             type: 'object',
//             properties: {
//               phone: { type: 'string' },
//               address: { type: 'string' }
//             }
//           },
//           worker_details: {
//             type: 'object',
//             properties: {
//               company: { type: 'string' },
//               is_company_admin: { type: 'boolean' }
//             }
//           },
//           student_details: {
//             type: 'object',
//             properties: {
//               school: { type: 'string' },
//               formation: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     degree: { type: 'string' },
//                     field: { type: 'string' },
//                     school: { type: 'string' },
//                     graduation_year: { type: 'integer' }
//                   }
//                 }
//               },
//               experience: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     title: { type: 'string' },
//                     company: { type: 'string' },
//                     location: { type: 'string' },
//                     start_date: { type: 'string', format: 'date-time' },
//                     end_date: { type: 'string', format: 'date-time' },
//                     description: { type: 'string' }
//                   }
//                 }
//               },
//               skills: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     name: { type: 'string' },
//                     level: { type: 'string' }
//                   }
//                 }
//               },
//               certification: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     name: { type: 'string' },
//                     provider: { type: 'string' },
//                     date: { type: 'string', format: 'date-time' }
//                   }
//                 }
//               },
//               languages: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     name: { type: 'string' },
//                     level: { type: 'string' }
//                   }
//                 }
//               },
//               game_info: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     level: { type: 'integer' },
//                     nb_jobs_done: { type: 'integer' },
//                     nb_jobs_atm: { type: 'integer' },
//                     title: { type: 'string' }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// };
// const options = {
//   swaggerDefinition,
//   apis: ['./src/routes/*.ts'],
// };
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
