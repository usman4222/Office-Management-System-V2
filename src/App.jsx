import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Dashboard/Dash'

function App() {



  return (
    <BrowserRouter>
      <Routes>
            <Route element={<Dash />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
