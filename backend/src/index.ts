import express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { connectToDatabase, closeDatabase } from './config/db';
import userRouter from './routes/user.route';
import studentRouter from './routes/student.route';

// Initialize
const app = express();
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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Gucci');
});

// Routes
app.use('/user', userRouter);
app.use('/student', studentRouter);

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