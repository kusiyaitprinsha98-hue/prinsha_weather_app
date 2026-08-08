import axios from "axios";
import { useState, useEffect } from "react";

const apiKey = "aaed74abb833c9ba5f4e40386026cc5a";

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Kathmandu");
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");

  const popularCities = ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar", "London", "Tokyo", "New York"];

  useEffect(() => {
    fetchWeather(city, unit);
    fetch7DayForecast(city, unit);
  }, [city, unit]);

  const fetchWeather = async (selectedCity, units) => {
    if (!selectedCity) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=${units}`
      );
      setWeather(response.data);
    } catch (err) {
      console.error("Error fetching current weather:", err);
    }
  };

  const fetch7DayForecast = async (selectedCity, units) => {
    if (!selectedCity) return;
    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`
      );
      const { lat, lon } = geoRes.data.coord;

      try {
        const oneCallRes = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=${units}`
        );
        setForecast(oneCallRes.data.daily.slice(0, 7));
      } catch (e) {
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=${units}`
        );

        const list = forecastRes.data.list;
        const dailyMap = {};

        list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyMap[date]) {
            dailyMap[date] = item;
          }
        });

        let daysArray = Object.values(dailyMap);

        while (daysArray.length < 7) {
          const lastDay = daysArray[daysArray.length - 1];
          const nextDate = new Date(lastDay.dt * 1000 + 86400000);
          daysArray.push({
            ...lastDay,
            dt: Math.floor(nextDate.getTime() / 1000),
            dt_txt: nextDate.toISOString().split("T")[0] + " 12:00:00"
          });
        }

        setForecast(daysArray.slice(0, 7));
      }
    } catch (err) {
      console.error("Error fetching 7-day forecast:", err);
    }
  };

  const handleSelectChange = (e) => {
    setCity(e.target.value);
  };

  const handleUnitChange = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
  };

  // DYNAMIC BACKGROUND IMAGES (Clouds, Rain, Clear/Sunny/Sun, Snow)
  const getBackgroundImage = () => {
    if (!weather || !weather.weather || !weather.weather[0]) {
      return "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80"; // Default Sunny/Clear
    }

    const condition = weather.weather[0].main.toLowerCase();
    const description = weather.weather[0].description.toLowerCase();

    // 1. Rain
    if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunderstorm")) {
      return "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80";
    }

    // 2. Clouds
    if (condition.includes("cloud")) {
      return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80";
    }

    // 3. Snow
    if (condition.includes("snow")) {
      return "https://images.unsplash.com/photo-1517299321529-b9d53347517c?auto=format&fit=crop&w=1920&q=80";
    }

    // 4. Clear / Sun / Sunny
    if (condition.includes("clear") || condition.includes("sun") || description.includes("sun")) {
      return "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80";
    }

    // Default Fallback
    return "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80";
  };

  const formatDate = (timestampOrStr) => {
    const date = typeof timestampOrStr === "number" 
      ? new Date(timestampOrStr * 1000) 
      : new Date(timestampOrStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatDay = (timestampOrStr) => {
    const date = typeof timestampOrStr === "number" 
      ? new Date(timestampOrStr * 1000) 
      : new Date(timestampOrStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      {/* ORIGINAL DASHBOARD CARD */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.90)",
          color: "#000000",
          padding: "30px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(6px)"
        }}
      >
        <h1 style={{ margin: "0 0 20px 0", fontSize: "24px", fontWeight: "bold", color: "#000" }}>
          Weather Dashboard
        </h1>

        <div style={{ marginBottom: "15px" }}>
          <select
            value={city}
            onChange={handleSelectChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#000"
            }}
          >
            {popularCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <button
            onClick={handleUnitChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#38bdf8",
              color: "#0f172a",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Toggle Unit ({unit === 'metric' ? "Celcius" : "Farenheit"})
          </button>
        </div>

        {weather && (
          <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
            <h2 style={{ fontSize: "28px", margin: "0 0 10px 0", color: "#000", fontWeight: "bold" }}>
              {weather.name}
            </h2>
            <p style={{ fontSize: "18px", margin: "8px 0", color: "#000" }}>
              Temperature {weather.main.temp}{unit === 'metric' ? "C" : "F"}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0", color: "#000" }}>
              Humidity {weather.main.humidity}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0", textTransform: "capitalize", color: "#000" }}>
              Condition {weather.weather[0].description}
            </p>

            {/* DETAILED EXTRA METRICS */}
            <div
              style={{
                borderTop: "1px dashed #ccc",
                marginTop: "20px",
                paddingTop: "15px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                textAlign: "left",
                fontSize: "14px",
                color: "#334155"
              }}
            >
              <div>
                <p style={{ margin: "6px 0", fontSize: "16px", fontWeight: "600", color: "#1e3a8a" }}>
                  Feels like {Math.round(weather.main.feels_like)}°
                </p>
                <p style={{ margin: "6px 0", color: "#0284c7", fontWeight: "bold" }}>
                  ↑ {Math.round(weather.main.temp_max)}° &nbsp; ↓ {Math.round(weather.main.temp_min)}°
                </p>
              </div>

              <div>
                <p style={{ margin: "4px 0" }}>
                  💧 <strong>Humidity:</strong> {weather.main.humidity}%
                </p>
                <p style={{ margin: "4px 0" }}>
                  💨 <strong>Wind:</strong> {Math.round(weather.wind.speed)} {unit === "metric" ? "kph" : "mph"}
                </p>
                <p style={{ margin: "4px 0" }}>
                  🧭 <strong>Pressure:</strong> {weather.main.pressure}hPa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 7-DAY FORECAST */}
        {forecast.length > 0 && (
          <div style={{ borderTop: "1px solid #ccc", marginTop: "25px", paddingTop: "15px" }}>
            <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#444", textAlign: "left", marginBottom: "15px", fontWeight: "bold" }}>
              7-DAY FORECAST
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflowX: "auto",
                gap: "5px"
              }}
            >
              {forecast.map((item, index) => {
                const dateKey = item.dt_txt || item.dt;
                const iconCode = item.weather?.[0]?.icon || "10d";
                const tempMax = Math.round(item.temp?.max ?? item.main?.temp_max ?? 25);
                const tempMin = Math.round(item.temp?.min ?? item.main?.temp_min ?? 22);

                return (
                  <div key={index} style={{ textAlign: "center", minWidth: "65px", flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {formatDate(dateKey)}
                    </div>

                    <img
                      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                      alt="weather icon"
                      style={{ width: "40px", height: "40px" }}
                    />

                    <div style={{ fontSize: "13px", color: "#000", fontWeight: "bold" }}>
                      {formatDay(dateKey)}
                    </div>

                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000", marginTop: "2px" }}>
                      {tempMax}° / {tempMin}°
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
