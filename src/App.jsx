import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Dashboard/Dash'
import Signin from './Signin'
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import AddEmployee from './components/EmployeeForm/AddEmployee';
import AllEmployees from './components/EmployeesTable/AllEmployees';
import UpdateEmployee from './components/EmployeeForm/UpdateEmployee';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)

  const user = isAuthenticated

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path='/' element={<Dash />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/allemployees' element={<AllEmployees />} />
          <Route path='/update-employee/:id' element={<UpdateEmployee />} />
        </Route>
        <Route element={<Signin />} path="/sign-in" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
