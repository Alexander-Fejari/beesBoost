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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const webSocket_config_1 = require("./config/webSocket.config");
const database_config_1 = require("./config/database.config");
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const company_route_1 = __importDefault(require("./routes/company.route"));
const companyOffers_route_1 = __importDefault(require("./routes/companyOffers.route"));
//import mailerRouter from './routes/maile.route';
dotenv_1.default.config();
// Initialize
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const server = http_1.default.createServer(app); // Creates HTTP server
// Middleware
app.use(express_1.default.json()); // Creates the app 
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default)); // Swagger - Documents the app
app.use((0, cors_1.default)({
    origin: [
        `http://localhost:5000`,
        `http://localhost:5173`,
        `http://localhost:5174`,
        `http://localhost:8000`,
        `http://127.0.0.1:5173`,
        `https://cinemania.space`,
    ],
    credentials: true
})); // cors - Protects the connection with the front
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            'http://localhost:5000',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:8000',
            'http://127.0.0.1:5173',
            'https://cinemania.space',
        ],
        credentials: true
    }
});
// Test route
app.get('/home', (req, res) => {
    res.send('Gucci');
});
// Routes
app.use(`/`, user_route_1.default); // User
app.use(`/auth`, auth_route_1.default); // Authentification
app.use(`/company`, company_route_1.default); // Companies
app.use(`/post`, companyOffers_route_1.default); // Companies Offers
//app.use(`/mail`, mailerRouter); // Testing mailer
// Connection database + Launching server
(0, database_config_1.connectToDatabase)()
    .then(() => {
    server.listen(port, () => {
        console.log(`Server launched on http://localhost:${port} and Documentation available on http://localhost:${port}/api-docs`);
    });
})
    .catch((err) => {
    console.error('Error connecting to MongoDB :', err);
});
io.on('connection', socket => {
    (0, webSocket_config_1.socketHandler)(socket, io);
});
// Closing database when server is closed
process.on(('SIGINT' || 'SIGTERM'), async () => {
    await (0, database_config_1.closeDatabase)();
    process.exit(0);
});
