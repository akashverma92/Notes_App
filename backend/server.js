const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const notesRoute = require('./routes/notes');
const askGeminiRoute = require('./routes/askGemini'); // ✅ Import Gemini route

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",  // Your frontend's origin
  credentials: true
}));
app.use(express.json());

app.use('/api/notes', notesRoute);
app.use('/api', askGeminiRoute); // ✅ Mount Gemini route under /api

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
