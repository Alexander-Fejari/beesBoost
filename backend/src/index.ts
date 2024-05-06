import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config'
import dotenv from 'dotenv';

import { connectToDatabase, closeDatabase } from './config/database.config';
import userRouter from './routes/user.route';


dotenv.config();

// Initialize
const app = express();
const port = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Gucci');
});

// Routes

// User
app.use('/user', userRouter);

// Company

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
process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});