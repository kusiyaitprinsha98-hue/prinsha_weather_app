import React, { useState } from 'react';

function About() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city) return;

    try {
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aaed74abb833c9ba5f4e40386026cc5a`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#f8fafc' }}>
      <h1>About Weather API</h1>
      
      <form onSubmit={fetchWeather} style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginRight: '10px',
            width: '250px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            backgroundColor: '#38bdf8',
            color: '#0f172a',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>

      {error && <p style={{ color: '#f87171' }}>{error}</p>}

      {weather && (
        <div>
          {/* Formatted Weather Card */}
          <div style={{
            backgroundColor: '#334155',
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '350px',
            margin: '20px auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{Math.round(weather.main.temp)}°C</h1>
            <p style={{ textTransform: 'capitalize', fontSize: '18px' }}>{weather.weather[0].description}</p>
            <hr style={{ margin: '15px 0', borderColor: '#475569' }} />
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>

          {/* Raw JSON Display Block */}
          <h3>Raw JSON Response:</h3>
          <pre style={{
            textAlign: 'left',
            backgroundColor: '#1e293b',
            color: '#38bdf8',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            margin: '20px auto',
            overflowX: 'auto',
            fontSize: '14px'
          }}>
            <code>{JSON.stringify(weather, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default About;