const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let reviews = [
  { id: 1, text: "Great homestay, very clean!", sentiment: "Positive" },
  { id: 2, text: "Location was hard to find.", sentiment: "Negative" },
  { id: 3, text: "It was okay, nothing special.", sentiment: "Neutral" }
];

app.get('/', (req, res) => {
  res.send('Homestay AI Backend is running!');
});

app.get('/api/reviews/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Search query 'q' is required" });
  }
  const filtered = reviews.filter(r => r.text.toLowerCase().includes(q.toLowerCase()));
  res.status(200).json(filtered);
});

app.get('/api/reviews', (req, res) => {
  res.status(200).json(reviews);
});

app.get('/api/reviews/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  res.status(200).json(review);
});

app.post('/api/reviews', (req, res) => {
  const { text, sentiment } = req.body;
  if (!text || !sentiment) {
    return res.status(400).json({ error: "Text and sentiment are required" });
  }
  const newReview = {
    id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
    text,
    sentiment
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.put('/api/reviews/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index === -1) {
    return res.status(404).json({ error: "Review not found" });
  }
  const { text, sentiment } = req.body;
  if (text) reviews[index].text = text;
  if (sentiment) reviews[index].sentiment = sentiment;
  res.status(200).json(reviews[index]);
});

app.delete('/api/reviews/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index === -1) {
    return res.status(404).json({ error: "Review not found" });
  }
  reviews.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke on the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});