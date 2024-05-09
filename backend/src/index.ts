import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config'
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToDatabase, closeDatabase } from './config/database.config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

dotenv.config();

// Initialize
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Creates the app 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger

app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:5173", "http://localhost:5174", "http://localhost:8000", "http://127.0.0.1:5000"],
  
    credentials: true
  }));

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Gucci');
});

// Routes
app.use(`/auth`, authRouter); // Authentification
app.use('/user', userRouter); // User

// Connection database + Launching server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server launched on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB :', err);
  });

// Closing database when server is closed
process.on(('SIGINT' || 'SIGTERM'), async () => {
  await closeDatabase();
  process.exit(0);
});