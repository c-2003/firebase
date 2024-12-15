
import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './components/Register';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import { auth } from './components/firebase';

function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
    })
  })

  return (
    <Router>

      <div className="App">
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route path='/' element = {user ? <Navigate to = "/profile" /> : <Login />} />
              <Route path='/login' element = {<Login />} />
              <Route path='/register' element = {<Register />} />
              <Route path='/profile' element = {<Profile />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
