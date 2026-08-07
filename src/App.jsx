import React, { useState } from 'react';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#1e293b',
    color: 'white'
  };

  const buttonStyle = (tabName) => ({
    background: activeTab === tabName ? '#38bdf8' : 'transparent',
    color: activeTab === tabName ? '#0f172a' : 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '10px'
  });

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={navStyle}>
        <h2>Weather App</h2>
        <div>
          <button style={buttonStyle('home')} onClick={() => setActiveTab('home')}>Home</button>
          <button style={buttonStyle('about')} onClick={() => setActiveTab('about')}>About</button>
          <button style={buttonStyle('contact')} onClick={() => setActiveTab('contact')}>Contact</button>
        </div>
      </nav>

      <main>
        {activeTab === 'home' && <Home />}
        {activeTab === 'about' && <About />}
        {activeTab === 'contact' && <Contact />}
      </main>
    </div>
  );
}

export default App;


