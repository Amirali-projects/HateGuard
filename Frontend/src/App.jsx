import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Detect from './pages/Detect';
import DetectionHistory from './pages/DetectionHistory';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] bg-grid">
        {/* The updated responsive Navbar tracking browser history link paths */}
        <Navbar />

        {/* Dynamic page viewport injection section */}
        <main className="flex-1 flex flex-col">
          <Routes>
            {/* Main Application Core Route Paths */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/detect" element={<Detect />} />
            <Route path="/history" element={<DetectionHistory />} />

            {/* Safety Fallback: Redirects unknown urls/typos directly back to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}