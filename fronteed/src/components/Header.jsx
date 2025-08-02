// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="text-center mt-8 relative">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)] transition-transform hover:scale-105">
        Notes Taking App
      </h1>
      <p className="text-gray-500 mt-2 text-lg">Write, save, export, and summarize your thoughts</p>

      {/* AI Icon */}
      <div
        className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
        onClick={() => navigate("/askai")}
        title="Ask AI"
      >
        <FaRobot size={24} />
      </div>
    </header>
  );
}
