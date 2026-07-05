import React from 'react';
import { ArrowRight, Sparkles, Home as HomeIcon, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      
      <div className="relative min-h-[70vh] flex flex-col justify-start pt-16 bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-2 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100/20 border border-stone-100/30 text-amber-300 mb-8 backdrop-blur-md shadow-lg">
            <Sparkles size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">AI-Powered Hospitality</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
            Understand your guests <br />
            <span className="text-amber-400">
              better than ever.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Automatically classify homestay reviews, detect sentiment, and extract actionable themes to elevate your guest experience and make every stay feel like home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-xl">
              Go to Dashboard
              <ArrowRight size={18} />
            </Link>
            <Link to="/reviews" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-900/50 hover:bg-stone-800 text-white border border-stone-500/30 backdrop-blur-md rounded-xl font-bold transition-all shadow-lg">
              Manage Reviews
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">Sentiment Analysis</h3>
            <p className="text-stone-500 leading-relaxed">Instantly classify incoming guest reviews as Positive, Neutral, or Negative so you always know how your guests feel.</p>
          </div>
          
          <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
              <HomeIcon size={28} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">Theme Detection</h3>
            <p className="text-stone-500 leading-relaxed">Automatically identify key feedback categories like cleanliness, location, food, and hospitality from unstructured text.</p>
          </div>
          
          <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
              <MessageCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">Instant Insights</h3>
            <p className="text-stone-500 leading-relaxed">Generate professional, empathetic responses and actionable analytics to continuously improve your property rating.</p>
          </div>
        </div>
      </div>

    </div>
  );
}