import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import FP from './pages/FreshPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fp" element={<FP />} />
      </Routes>
    </Router>
  );
}

export default App;
