"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
const student_route_1 = __importDefault(require("./routes/student.route"));
const app = (0, express_1.default)();
const port = 5000;
// Middleware
app.use(express_1.default.json());
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
// Test route
app.get('/', (req, res) => {
    res.send('Gucci');
});
// Routes
app.use('/user', user_route_1.default);
app.use('/student', student_route_1.default);
// Closing database when server is closed
process.on('SIGINT', async () => {
    await (0, db_1.closeDatabase)();
    process.exit(0);
});
