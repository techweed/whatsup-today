import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { setBackGround } from "../../helpers/utils";
import "./styles.css";
import { back } from "../../assests/images";

const Weather = () => {
  const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();

  useEffect(() => {
    let lat, lon;
    // checking if location data is available
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;
      // calling weather api
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
          setLoading(false);
        });
    });
  }, []);

  const toBack = () => {
    history.goBack();
  };

  return (
    <div
      className="body-background"
      style={{
        backgroundImage:
          "url(" + setBackGround(data.weather && data.weather[0].id) + ")",
      }}
    >
      <div className="mask">
        <img src={back} className="icon-back" onClick={toBack} />
        <div className="temperature">
          <div>Temperature: {data?.main?.temp}</div>
          <div>Feels Like: {data?.main?.feels_like}</div>
          <div>Pressure: {data?.main?.pressure}</div>
          <div>Humidity: {data?.main?.humidity}</div>
          <br />
          <div>Wind Speed: {data?.wind?.speed}</div>
          <div>Wind Degree: {data?.wind?.deg}</div>
        </div>
        <div className="weather-title">
          {data.weather &&
            data?.weather[0]?.description.charAt(0).toUpperCase() +
              data?.weather[0]?.description.slice(1)}
          {loading ? "Loading..." : ""}
          {error && !loading ? "Sorry, Service Unavailable" : ""}
        </div>
        <div>{data?.name}</div>
      </div>
    </div>
  );
};

export default Weather;
