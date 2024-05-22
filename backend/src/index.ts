import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config'
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToDatabase, closeDatabase } from './config/database.config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import companyRouter from './routes/company.route';
import cOffersRouter from './routes/companyOffers.route';
//import mailerRouter from './routes/maile.route';

dotenv.config();

// Initialize
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Creates the app 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger - Documents the app

app.use(cors({
  origin: [`http://localhost:5000`, `http://localhost:5173`, `http://localhost:5174`, `http://localhost:8000`, `http://127.0.0.1:5173`, `https://cinemania.space`],
  
    credentials: true
  })); // cors - Protects the connection with the front

// Test route
app.get('/home', (req: Request, res: Response) => {
  res.send('Gucci');
});

// Routes
app.use(`/`, userRouter); // User
app.use(`/auth`, authRouter); // Authentification
app.use(`/company`, companyRouter); // Companies
app.use(`/post`, cOffersRouter); // Companies Offers
//app.use(`/mail`, mailerRouter); // Testing mailer


// Connection database + Launching server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server launched on http://localhost:${port} and Documentation available on http://localhost:${port}/api-docs`);
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