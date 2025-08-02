import { useState } from "react";
import axios from "../utils/axiosInstance"; // Or use axios directly if not created
import { FaPaperPlane } from "react-icons/fa";

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("/ask", { question });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setResponse("Error: Could not get a response from Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 text-black bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Ask AI</h2>

      <textarea
        className="w-full p-4 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={4}
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>

      <button
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
        onClick={handleAsk}
        disabled={loading}
      >
        <FaPaperPlane />
        {loading ? "Asking..." : "Ask"}
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-2">AI Response:</h3>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}
