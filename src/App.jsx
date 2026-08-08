import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <header className="navbar-header">
          <div className="navbar-container">
            <div className="navbar-brand">
              <NavLink to="/">
                🌤️ <span>Weather App</span>
              </NavLink>
            </div>

            <nav className="navbar-menu">
              <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Main Content View */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


