import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p>This page will display sentiment analytics and review statistics.</p>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;