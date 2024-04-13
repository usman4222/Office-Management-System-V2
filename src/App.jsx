import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Dashboard/Dash'
import Signin from './Signin'
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)

  const user = isAuthenticated

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path='/' element={<Dash />} />
        </Route>
        <Route element={<Signin />} path="/sign-in" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
