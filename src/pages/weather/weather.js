import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import {
  Images2,
  Images3,
  Images4,
  Images5,
  Images6,
  Images7,
  Images8,
} from "../../assests/images";

const Weather = () => {
  const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let lat, lon;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;

      axios({
        method: "GET",
        url: url,
      })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
        });
    });
  }, []);

  const setBg = (x) => {
    switch (true) {
      case x < 300:
        return Images2;
      case x < 400:
        return Images3;
      case x < 600:
        return Images4;
      case x < 700:
        return Images5;
      case x < 800:
        return Images6;
      case x === 800:
        return Images7;
      case x > 800:
        return Images8;
      default:
        return 0;
    }
  };

  return (
    <div
      className="body-background"
      style={{
        backgroundImage:
          "url(" + setBg(data.weather && data.weather[0].id) + ")",
      }}
    >
      <div className="mask">
        <div className="weather-title">
          {data.weather && data?.weather[0]?.description}
          {loading ? "Loading..." : ""}
          {error ? "Sorry, Service Unavailable" : ""}
        </div>
      </div>
    </div>
  );
};

export default Weather;
