import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import MenuPage from './components/MenuPage';
import Contact from './components/Contact';
import Calculator from './components/Calculator';
import About from './components/About';
import HealthHistory from './components/History';


function App() {
  return (
    <Router>
       <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menuPage" element={<MenuPage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/History" element={<HealthHistory />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;