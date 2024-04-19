const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur backend fonctionne correctement !');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});