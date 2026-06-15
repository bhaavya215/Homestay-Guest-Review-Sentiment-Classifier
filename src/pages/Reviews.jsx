import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reviews() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">Reviews</h1>
        <p>This page will allow users to analyze guest reviews.</p>
      </div>
      <Footer />
    </>
  );
}

export default Reviews;