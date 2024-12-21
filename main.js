// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Animal schema and model
const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  habitat: { type: String, required: true }
});

const Animal = mongoose.model('Animal', animalSchema);

// Routes
// Create a new animal
app.post('/animals', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    const savedAnimal = await animal.save();
    res.status(201).json(savedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all animals
app.get('/animals', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single animal by ID
app.get('/animals/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an animal by ID
app.put('/animals/:id', async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAnimal) return res.status(404).json({ error: 'Animal not found' });
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an animal by ID
app.delete('/animals/:id', async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) return res.status(404).json({ error: 'Animal not found' });
    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
