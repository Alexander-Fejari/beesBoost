import express, { Request, Response } from 'express';
import { connectToDatabase, closeDatabase } from './config/db';
import userRouter from './routes/user.route';
import studentRouter from './routes/student.route';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

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

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Gucci');
});

// Routes
app.use('/user', userRouter);
app.use('/student', studentRouter);

// Closing database when server is closed
process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});