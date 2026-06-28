import { useState, useEffect } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Homestay Reviews</h1>
      <div className="grid gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <p className="text-lg mb-2"><span className="font-semibold">Review:</span> {review.text}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Sentiment:</span> {review.sentiment}</p>
            </div>
          ))
        ) : (
          <p>Loading reviews...</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;