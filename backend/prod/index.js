"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
const student_route_1 = __importDefault(require("./routes/student.route"));
const enterprise_route_1 = __importDefault(require("./routes/enterprise.route"));
//import getDataRouter from './routes/getData.route';
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
(0, db_1.connectToDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.get('/', (req, res) => {
    res.send('Gucci');
});
app.use('/users', user_route_1.default);
app.use('/students', student_route_1.default);
app.use('/enterprises', enterprise_route_1.default);
//app.use('/data', getDataRouter);
process.on('SIGINT', async () => {
    await (0, db_1.closeDatabase)();
    process.exit(0);
});
