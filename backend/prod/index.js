"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const db_1 = require("./config/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
const student_route_1 = __importDefault(require("./routes/student.route"));
// Initialize
const app = (0, express_1.default)();
const port = 5000;
// Swagger setup
const swaggerOptions = {
    definition: {
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
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Middleware
app.use(express_1.default.json());
// Test route
app.get('/', (req, res) => {
    res.send('Gucci');
});
// Routes
app.use('/user', user_route_1.default);
app.use('/student', student_route_1.default);
// Connection database + Launching server
(0, db_1.connectToDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server launched on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Error connecting to MongoDB :', err);
});
// Closing database when server is closed
process.on('SIGINT', async () => {
    await (0, db_1.closeDatabase)();
    process.exit(0);
});
