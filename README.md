
#  Note Editor App

A modern **Note Editor Web App** with support for **rich text editing** using Lexical and a **drawing canvas** that saves data to a database (not just images). Ideal for journaling, sketching, note-taking, or creative writing. Optional integration with **Google Gemini API** for AI-powered assistance.

---

##  Features

- Rich Text Editor (Lexical)
- Drawing Canvas with stroke data preservation
- Save and retrieve full notes (text + drawing)
- Optional AI assistance using Gemini API
- Edit / Delete saved notes
- Responsive design for desktop & mobile

---

##  Tech Stack

- Frontend: React, 
- Backend: Node.js,
- Database: MongoDB,
- API: Google Gemini API (optional) // you have get the API from google cloud console

---



##  Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/note-editor-app.git
cd note-editor-app
```

---

### 🔹 2. Start Backend Server

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_google_gemini_api_key   # optional
```

Run the server:

```bash
npm start
```

---

### 🔹 3. Start Frontend

```bash
cd ../client
npm install
npm start
```

---

##  Gemini API (Optional)

To enable the AI assistant:

1. Get an API key from: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Add it to `server/.env` as `GEMINI_API_KEY`
3. Restart the server

Click the "Ask AI" icon in the app to use it.

--

##  License

MIT License. Free for personal and commercial use.

---

##  Author

**Akash Verma**  
[GitHub](https://github.com/Akashverma92) | [LinkedIn](https://www.linkedin.com/in/Akash-Verma92)

---

##  Live Demo

_Coming soon (Vercel/Netlify + Render setup)_
