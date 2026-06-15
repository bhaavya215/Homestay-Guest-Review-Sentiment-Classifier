import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;