const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  text: String,
  canvasPages: Array,
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
