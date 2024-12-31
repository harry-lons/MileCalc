import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import FreshPlan from './pages/FreshPlan';
import Builder from './pages/Builder';

function App() {
  return (
    <Router>
      <div id="wrapper">
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fp" element={<FreshPlan />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
