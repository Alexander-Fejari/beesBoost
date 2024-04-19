const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend fonctionne correctement !');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});