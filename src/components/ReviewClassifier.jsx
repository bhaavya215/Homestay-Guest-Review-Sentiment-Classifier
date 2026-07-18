import React, { useState } from 'react';

const ReviewClassifier = () => {
    const [review, setReview] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/ai/classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewText: review })
            });
            if (!response.ok) throw new Error('Classification failed');
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError('Failed to process AI request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter review here..." />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Processing...' : 'Classify Review'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <p>Sentiment: {result.sentiment}</p>
                    <p>Themes: {result.themes.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default ReviewClassifier;