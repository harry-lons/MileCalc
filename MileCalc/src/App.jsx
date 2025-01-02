import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import FP from './pages/FreshPlan';
import Builder from './pages/Builder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fp" element={<FP />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </Router>
  );
}

export default App;
