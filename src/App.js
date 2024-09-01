import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import HomePage from './pages/HomePage';
import InGamePage from './pages/InGamePage';
import UnavailablePage from './pages/UnavailablePage';

import words from './words';
import './App.css';

function App() {
  return (
    <>
    <BrowserView>
      <Routes>
        <Route path={words.routes.home} element={<HomePage/>} />
        <Route path={words.routes.freeplay} element={<InGamePage freeplay/>} />
        <Route path={words.routes.challenge} element={<InGamePage challenge/>} />
      </Routes>
    </BrowserView>

    <MobileView>
      <Routes>
        <Route path={words.routes.home} element={<UnavailablePage/>} />
      </Routes>
    </MobileView>
    </>
  );
}

export default App;
