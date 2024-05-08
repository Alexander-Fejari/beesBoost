"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = require("./config/database.config");
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
// Initialize
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5000", "http://localhost:5173", "http://localhost:5174", "http://localhost:8000"],
    credentials: true
}));
// Test route
app.get('/', (req, res) => {
    res.send('Gucci');
});
// Routes
// User
app.use('/user', user_route_1.default);
// Company
// Connection database + Launching server
(0, database_config_1.connectToDatabase)()
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
    await (0, database_config_1.closeDatabase)();
    process.exit(0);
});
