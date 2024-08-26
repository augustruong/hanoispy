import React from 'react';
import {Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import InGamePage from './pages/InGamePage';

import words from './words';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={words.routes.home} element={<HomePage />} />
      <Route path={words.routes.freeplay} element={<InGamePage freeplay/>} />
      <Route path={words.routes.challenge} element={<InGamePage challenge/>} />
    </Routes>
  );
}

export default App;
