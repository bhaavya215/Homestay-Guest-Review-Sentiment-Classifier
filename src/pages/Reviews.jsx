import { useState, useEffect } from "react";

function Reviews() {
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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Homestay Reviews</h1>
      
      <form onSubmit={handleCreate} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Add a Review (Create)</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type review here..."
            className="border p-2 rounded flex-1"
            required
          />
          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {isLoading ? (
          <p>Loading reviews from MongoDB...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
              <div>
                <p className="text-lg mb-2"><span className="font-semibold">Review:</span> {review.text}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Sentiment:</span> {review.sentiment}</p>
              </div>
              <button 
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Create one above!</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;