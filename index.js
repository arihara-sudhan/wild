const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

const animals = [
  { name: "Tiger", scname: "Panthera tigris", imgUrl: "https://media.tenor.com/I5qDAfXocn4AAAAM/tiger-baby-tiger.gif" },
  { name: "Lion", scname: "Panthera leo", imgUrl: "https://i.pinimg.com/originals/4c/15/db/4c15db2297836032189737d19fe3fc33.gif" },
  { name: "Elephant", scname: "Loxodonta", imgUrl: "https://media.tenor.com/_eO0Tk6IXwsAAAAM/the-jungle-book-elephant.gif" },
  { name: "Cheetah", scname: "Acinonyx jubatus", imgUrl: "https://media.tenor.com/FhV97aUmAzgAAAAM/leopard.gif" },
  { name: "Zebra", scname: "Equus quagga", imgUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/c6ec50100657999.5f0dbfe37f10d.gif" }
];

app.get('/animals', (req, res) => {
    res.json(animals);
});

app.get('/:name', (req, res) => {
  const animalName = req.params.name.toLowerCase();
  const animal = animals.find(a => a.name.toLowerCase() === animalName);

  if (animal) {
    res.json(animal);
  } else {
    res.status(404).json({ error: "Animal not found" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
