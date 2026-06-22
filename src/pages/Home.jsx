import Hero from "../components/Hero";
import Card from "../components/Card";

function Home() {
  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            title="Sentiment Analysis"
            description="Classify reviews as Positive, Neutral, or Negative."
          />

          <Card 
            title="Theme Detection"
            description="Identify food, cleanliness, location, and hospitality feedback."
          />

          <Card 
            title="AI Response Suggestions"
            description="Generate professional responses for guest reviews."
          />
        </div>
      </section>
    </>
  );
}

export default Home;