import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p>
          Information about the AI-Powered Homestay Guest Review Sentiment Classifier.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;