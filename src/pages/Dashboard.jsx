function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Monitor sentiment analysis results and review insights.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="shadow-md p-6 rounded-lg">
          <h2 className="font-bold">Positive Reviews</h2>
          <p>120</p>
        </div>

        <div className="shadow-md p-6 rounded-lg">
          <h2 className="font-bold">Neutral Reviews</h2>
          <p>45</p>
        </div>

        <div className="shadow-md p-6 rounded-lg">
          <h2 className="font-bold">Negative Reviews</h2>
          <p>15</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;