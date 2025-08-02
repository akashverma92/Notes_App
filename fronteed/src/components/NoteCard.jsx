// src/components/NoteCard.jsx
export default function NoteCard({ title, description, onClick, icon }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white text-gray-800 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 hover:shadow-2xl w-full max-w-sm"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
