import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('ZbraZbra');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});