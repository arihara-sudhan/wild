const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
app.use(cors());
app.use(bodyParser());
const PORT = process.env.PORT;
const DBURI = process.env.MONGO_URI;

mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true }
});

const Animal = mongoose.model('Animal', animalSchema);

app.post('/animals', async (req, res) => {
    try {
      const animal = new Animal(req.body);
      const savedAnimal = await animal.save();
      res.status(201).json(savedAnimal);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

app.get('/animals', async (req, res) => {
    try {
      const animals = await Animal.find();
      res.json(animals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
app.get('/animals/:id', async (req, res) => {
    try {
      const animal = await Animal.findById(req.params.id);
      if (!animal) return res.status(404).json({ error: 'Animal not found' });
      res.json(animal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
app.delete('/animals/:id', async (req, res) => {
    try {
      const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
      if (!deletedAnimal) return res.status(404).json({ error: 'Animal not found' });
      res.json({ message: 'Animal deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.put('/animals/:id', async (req, res) => {
    try {
      const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedAnimal) return res.status(404).json({ error: 'Animal not found' });
      res.json(updatedAnimal);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, ()=>{
    console.log(`Listening at PORT: ${PORT} 🤫🧞‍♂️`);
})
