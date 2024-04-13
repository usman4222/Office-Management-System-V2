import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Dashboard/Dash'
import Signin from './Signin'

function App() {



  return (
    <BrowserRouter>
      <Routes>
            <Route element={<Dash />} path="/" />
            <Route element={<Signin />} path="/sign-in" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
