import { useState } from "react";

import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [input, setInput] = useState("");

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=841c0f24991d6e50a7c258618d59fe82`
      );
      setData(response.data.main.temp);
    } catch (error) {
      alert("error");
    }
  };

  const getCurrentLocationWeatherData = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=841c0f24991d6e50a7c258618d59fe82`
            );
            console.log(response);
            setData(response.data.main.temp);
          } catch (error) {
            alert(error);
          }
        },
        (error) => {
          setError("Error getting location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  console.log(location);
  console.log(error);

  return (
    <div className="container">
      <div className="temp-container">
        {data ? (
          <span> {Math.round(data)}&deg;c </span>
        ) : (
          <span> Weather App </span>
        )}
      </div>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter city name"
        className="input"
      />
      <button className="button" onClick={() => getWeatherData()}>
        Search by City 🌍
      </button>

      <button
        className="button"
        onClick={() => getCurrentLocationWeatherData()}
      >
        Current Location Weather 🗺️
      </button>
    </div>
  );
}

export default App;
