const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Create a new note
router.post('/createnote', async (req, res) => {
  try {
    const { text, canvasPages } = req.body;
    const newNote = new Note({ text, canvasPages });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//GET: Get a note 
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // latest first
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while fetching notes" });
    }
});
module.exports = router;