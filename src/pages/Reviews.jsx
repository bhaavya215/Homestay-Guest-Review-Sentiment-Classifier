import React, { useState, useEffect } from "react";
import { MessageSquarePlus, Trash2, Sparkles, AlertCircle } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [lastAiResult, setLastAiResult] = useState(null);

  const fetchReviews = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/reviews", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCreateWithAI = async (e) => {
    e.preventDefault();
    setIsAiLoading(true);
    setAiError(null);
    setLastAiResult(null);

    try {
      const aiResponse = await fetch("http://localhost:5000/api/ai/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewText: text }),
      });

      if (!aiResponse.ok) {
        throw new Error("AI classification failed");
      }

      const aiData = await aiResponse.json();
      setLastAiResult(aiData);

      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text, sentiment: aiData.sentiment }),
      });

      setText("");
      fetchReviews();
    } catch (err) {
      setAiError("AI classification failed. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(() => fetchReviews())
      .catch((err) => {});
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto mt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Homestay Reviews</h1>
          <p className="text-slate-500 mt-2">Manage and analyze guest feedback using AI.</p>
        </header>

        {aiError && (
          <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl flex items-center gap-3">
            <AlertCircle className="text-rose-500" size={24} />
            <p className="text-rose-700 font-medium">{aiError}</p>
          </div>
        )}

        {lastAiResult && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <h3 className="text-blue-900 font-bold mb-2">Latest AI Classification Results:</h3>
            <p className="text-blue-800"><span className="font-semibold">Sentiment:</span> {lastAiResult.sentiment}</p>
            <p className="text-blue-800"><span className="font-semibold">Themes Detected:</span> {lastAiResult.themes.join(", ")}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquarePlus className="text-blue-600" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Add a New Review</h2>
          </div>
          
          <form onSubmit={handleCreateWithAI} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type guest review here..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              disabled={isAiLoading}
            />
            
            <button 
              type="submit"
              disabled={isAiLoading || !text}
              className={`flex items-center justify-center gap-2 px-8 py-3 font-bold rounded-xl shadow-md transition-colors ${
                isAiLoading 
                  ? 'bg-slate-400 cursor-not-allowed text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isAiLoading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Sparkles size={18} />
                  Auto-Classify
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-slate-500 font-medium">Loading reviews from MongoDB...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <p className="text-slate-800 text-lg mb-3 leading-relaxed">
                    <span className="font-bold mr-2 text-slate-900">Review:</span>
                    {review.text}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-xs">Sentiment:</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      review.sentiment === 'Positive' ? 'text-emerald-700 bg-emerald-100' :
                      review.sentiment === 'Negative' ? 'text-rose-700 bg-rose-100' :
                      'text-amber-700 bg-amber-100'
                    }`}>
                      {review.sentiment}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDelete(review._id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold rounded-lg transition-colors border border-rose-100"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 font-medium">No reviews yet. Create one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}