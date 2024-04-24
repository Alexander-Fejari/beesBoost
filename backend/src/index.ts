import express, { Request, Response } from 'express';
import { connectToDatabase, closeDatabase } from './config/db';
import userRouter from './routes/user.route'
import studentsRouter from './routes/student.route';
import enterpriseRouter from './routes/enterprise.route';
//import getDataRouter from './routes/getData.route';

const app = express();
const port = 5000;

app.use(express.json());

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Gucci');
});

app.use('/users', userRouter);
app.use('/students', studentsRouter);
app.use('/enterprises', enterpriseRouter);

//app.use('/data', getDataRouter);

process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});