import React, { useState, useEffect } from "react";
import { MessageSquarePlus, Trash2 } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("Positive");

  const fetchReviews = () => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sentiment }),
    })
      .then((res) => res.json())
      .then(() => {
        setText("");
        fetchReviews();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchReviews())
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto mt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Homestay Reviews</h1>
          <p className="text-slate-500 mt-2">Manage and analyze guest feedback directly from the database.</p>
        </header>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquarePlus className="text-blue-600" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Add a New Review</h2>
          </div>
          
          <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type guest review here..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium text-slate-700"
            >
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
            <button 
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Submit
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
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider text-xs">Sentiment:</span>
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