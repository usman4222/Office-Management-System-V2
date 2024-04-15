import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Dashboard/Dash'
import Signin from './Signin'
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import AddEmployee from './components/EmployeeForm/AddEmployee';
import AllEmployees from './components/EmployeesTable/AllEmployees';
import UpdateEmployee from './components/EmployeeForm/UpdateEmployee';
import EmployeeAttendanceTable from './components/EmployeesTable/EmployeeAttendanceTable';
import AttendanceMarkerForm from './components/EmployeeForm/AttendanceMarkerForm';

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
          <Route path='/employee-attendance' element={<EmployeeAttendanceTable />} />
          <Route path='/attendance/:id' element={<AttendanceMarkerForm />} />
        </Route>
        <Route element={<Signin />} path="/sign-in" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
