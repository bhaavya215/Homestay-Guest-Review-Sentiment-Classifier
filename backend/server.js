const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const requireAuth = require('./middleware/requireAuth');
const Review = require('./models/Review');

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Homestay AI Backend is running!');
});

app.get('/api/reviews/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query 'q' is required" });
    }
    const filtered = await Review.find({ text: { $regex: q, $options: 'i' } });
    res.status(200).json(filtered);
  } catch (err) {
    next(err);
  }
});

app.get('/api/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

app.get('/api/reviews/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
});

app.post('/api/reviews', requireAuth, async (req, res, next) => {
  try {
    const { text, sentiment } = req.body;
    if (!text || !sentiment) {
      return res.status(400).json({ error: "Text and sentiment are required" });
    }
    const newReview = new Review({ text, sentiment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

app.put('/api/reviews/:id', requireAuth, async (req, res, next) => {
  try {
    const { text, sentiment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { text, sentiment },
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/reviews/:id', requireAuth, async (req, res, next) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke on the server!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});