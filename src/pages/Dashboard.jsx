import React from 'react';
import { TrendingUp, Users, Star, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Dashboard() {

  // Top Statistics Data
  const stats = [
    { title: "Total Reviews", value: "180", icon: MessageSquare, trend: "+12%" },
    { title: "Positive Sentiment", value: "120", icon: Star, trend: "+5%" },
    { title: "Neutral Sentiment", value: "45", icon: Users, trend: "Stable" },
    { title: "Negative Sentiment", value: "15", icon: TrendingUp, trend: "-2%" }
  ];

  // Chart Data (Matches your top statistics)
  const sentimentData = [
    { name: 'Positive', value: 120, color: '#10b981' }, // Tailwind emerald-500
    { name: 'Neutral', value: 45, color: '#f59e0b' },  // Tailwind amber-500
    { name: 'Negative', value: 15, color: '#f43f5e' }, // Tailwind rose-500
  ];

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto mt-8">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 border border-amber-200 text-amber-700 mb-4">
            <TrendingUp size={14} />
            <span className="text-xs font-bold tracking-wider uppercase">Live Analytics</span>
          </div>
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight">Performance Dashboard</h1>
          <p className="text-stone-500 mt-2 text-lg">Monitor your homestay performance, analyze guest sentiment, and uncover actionable insights.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <stat.icon size={24} />
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${stat.trend.includes('-') ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-stone-500 text-sm font-semibold uppercase tracking-wider">{stat.title}</h3>
              <p className="text-4xl font-bold text-stone-800 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
          
          {/* Interactive Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 shadow-sm p-8 min-h-[450px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-stone-800">Sentiment Distribution</h3>
              <select className="bg-stone-50 border border-stone-200 text-stone-600 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
            
            {/* Recharts Donut Chart */}
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Activity Feed */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 min-h-[450px]">
            <h3 className="text-2xl font-bold text-stone-800 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="p-5 border border-stone-100 rounded-2xl bg-stone-50 hover:bg-white transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/50 px-2.5 py-1 rounded-lg">Positive</span>
                  <span className="text-xs font-medium text-stone-400">Just now</span>
                </div>
                <p className="text-stone-600 text-sm font-medium leading-relaxed line-clamp-3 group-hover:text-stone-800 transition-colors">
                  "Absolutely amazing stay! The host was incredibly welcoming, the room was spotless, and the Wi-Fi was fast enough for me to work."
                </p>
              </div>
              
              <div className="p-5 border border-stone-100 rounded-2xl bg-stone-50 hover:bg-white transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/50 px-2.5 py-1 rounded-lg">Negative</span>
                  <span className="text-xs font-medium text-stone-400">2 hours ago</span>
                </div>
                <p className="text-stone-600 text-sm font-medium leading-relaxed line-clamp-3 group-hover:text-stone-800 transition-colors">
                  "Very disappointed. The room looked nothing like the pictures, there was no hot water in the morning, and it was incredibly noisy."
                </p>
              </div>
              
              <button className="w-full py-3 mt-4 text-sm font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors">
                View All Reviews →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}