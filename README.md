# Prinsha Weather App

A responsive, multi-view weather monitoring web application built with React, Vite, and Axios for CSE 230 Practical Assignment.

---

## 🌟 Key Features

* **Multi-View Navigation:** Client-side view switching (`Home`, `About`, `Contact`) using React state without full page reloads.
* **Live Weather Metrics:** Displays real-time temperature, humidity, and weather conditions for popular cities (Kathmandu, Pokhara, London, Tokyo, New York, etc.).
* **Dynamic Background Engine:** Contextual Unsplash background imagery that dynamically adapts to real-time weather conditions (Rain, Clouds, Snow, Clear).
* **7-Day Forecast:** Daily extended forecast breakdown complete with OpenWeatherMap weather condition icons and high/low temperature ranges.
* **Persistent Temperature Scale:** Preference toggle between Celsius (`metric`) and Fahrenheit (`imperial`) stored locally using `localStorage`.
* **WCAG 2.1 Accessible Contact Form:** Built-in form with accessible label-to-input pairings.

---

## 🛠️ Tech Stack & Technologies

* **Frontend:** React 18, JSX
* **Build Tool:** Vite
* **HTTP Client:** Axios
* **API:** OpenWeatherMap REST API
* **Storage:** HTML5 Web Storage API (`localStorage`)
* **Styling:** Dynamic Inline React Styles

---

## 🚀 Local Development Setup

To run this application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kusiyaitprinsha98-hue/prinsha_weather_app.git
   cd prinsha_weather_app
   