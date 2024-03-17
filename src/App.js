import './css/App.css';
import './css/fonts.css';
import './css/TwoColumnLayout.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import mqtt from 'mqtt';
import Home from './pages/Home';
import EpipremnumMarbleGreen from './pages/EpipremnumMarbleGreen';
import PhilodendronPVerrucosum from './pages/PhilodendronPVerrucosum';

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/EpipremnumMarbleGreen" element={<EpipremnumMarbleGreen />} />
                  <Route path="/PhilodendronPVerrucosum" element={<PhilodendronPVerrucosum />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
