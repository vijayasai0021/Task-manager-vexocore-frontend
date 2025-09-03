import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

//A simple dashboard placeholder
const Dashboard = () => <h1>Welcome to your Task Manager!</h1>;

//A component to protect routes
const PrivateRoute = ({children})=>{
  const token  = localStorage.getItem('token');
  return token ? children : <Navigate to="/login"/>;
};

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/signup" element = {<SignupPage/>}/>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <DashboardPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
