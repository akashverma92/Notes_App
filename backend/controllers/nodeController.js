// backend/controllers/noteController.js
const notes = [];

const createNote = (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

const getNotes = (req, res) => {
  res.json(notes);
};

module.exports = { createNote, getNotes };
