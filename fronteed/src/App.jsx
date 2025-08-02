import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import NoteEditor from "./components/NoteEditor";
import SavedNotes from "./components/SavedNotes";
import AskAI from "./pages/askai"; // ✅ Import your AskAI page

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10">
      <NoteCard
        title="Create Note"
        description="Start a new note with rich formatting"
        onClick={() => navigate("/create")}
        icon="📝"
      />
      <NoteCard
        title="Saved Notes"
        description="View, export, or summarize your saved notes"
        onClick={() => navigate("/saved")}
        icon="📚"
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-600 to-purple-800 text-white">
      <Header />
      <main className="p-8 mt-10 w-full max-w-6xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<NoteEditor />} />
          <Route path="/saved" element={<SavedNotes />} />
          <Route path="/askai" element={<AskAI />} />
        </Routes>
      </main>
    </div>
  );
}
