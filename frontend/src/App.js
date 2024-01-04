import React from 'react';
import {BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import AdminHome from './page/AdminHome';
import DocHome from './page/DocHome';
import Home from './page/Home';
import Departments from './page/Departments';
import Login from './page/Login';

import Patients from './page/Patients'
import PatientDetails from './page/PatientDetails'
import PatientReg from './page/PatientReg'
import PrivateRoute from './component/PrivateRoute'

import Header from './component/Header';
import Footer from './component/Footer';
import MediaDisplay from "./page/MediaDisplay"
import Dashboard from './page/Dashboard';

import Register from './page/Register'
import ViewStaffs from './page/ViewStaffs'
import ViewStaff from './page/ViewStaff';


function App() {
  return (
    <div className='bg-no-repeat bg-right-bottom bg-fixed'>
        <Router>
        <Header />
          <Routes>
          <Route path='/login' element={<Login />} />
          </Routes>
                    
            <Routes>
            
              <Route path='/' element={<PrivateRoute><AdminHome /></PrivateRoute>}>
                <Route path='mediadisplay' element={<PrivateRoute><MediaDisplay /></PrivateRoute>} />
                <Route path='departments' element={<PrivateRoute><Departments /></PrivateRoute>} />
                <Route path='home' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path='/register' element={<Register />} />
                <Route path='/viewstaffs' element={<PrivateRoute><ViewStaffs /></PrivateRoute>} />
                <Route path='/viewstaff' element={<PrivateRoute><ViewStaff /></PrivateRoute>} />
                <Route path='/patientreg' element={<PrivateRoute><PatientReg /></PrivateRoute>} />
                <Route path='/patients' element={<PrivateRoute><Patients /></PrivateRoute>} />
                <Route exact path=':_id' element={<PrivateRoute><PatientDetails /></PrivateRoute>} />


              </Route>

              <Route path='doc' element={<PrivateRoute><DocHome /></PrivateRoute>}>
                <Route path='mediadisplay' element={<PrivateRoute><MediaDisplay /></PrivateRoute>} />
                <Route path='departments' element={<PrivateRoute><Departments /></PrivateRoute>} />
              </Route>

              <Route path='/patientdetails/:_id' element={<PrivateRoute><PatientDetails /></PrivateRoute>} />    
              
             
            </Routes>
            <Footer />
        </Router>
          
          <ToastContainer />
    </div>
  );
}

export default App;
