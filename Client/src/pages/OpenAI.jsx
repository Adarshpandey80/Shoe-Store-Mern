import React, { useState } from "react";
import axios from "axios";

function OpenAI() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {
        const api = "http://localhost:8000/aichat/ai/ask";
      setLoading(true);
      const res = await axios.post(api, { prompt });
      setReply(res.data.reply);
    } catch (error) {
      console.error(error);
      alert("AI error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {reply && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <strong>AI:</strong> {reply}
          </div>
        )}
      </div>
    </div>
  );
}

export default OpenAI;
