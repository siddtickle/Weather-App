import React, { useState, useEffect } from "react";
import HourlyBlock from "./HourlyBlock";
import DailyBlock from "./DailyBlock";
import Button from "@material-ui/core/Button";

const API_KEY = process.env.REACT_APP_api_key;

function WeatherInfo({ weather, latitude, longitude }) {
  // const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [label, setLabel] = useState(false);

  const handleButton = () => {
    setLabel(!label);
  };

  useEffect(() => {
    const url = new URL(`https://api.openweathermap.org/data/2.5/onecall`);
    url.searchParams.append("lat", latitude);
    url.searchParams.append("lon", longitude);
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("units", "imperial");

    if (latitude !== undefined && longitude !== undefined)
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          // also important to check html error codes
          // 200 means no errors
          //if (obj.cod === 200) {
          // setForecast(obj);
          // console.log(obj);
          // console.log(obj.daily[0]);
          setHourlyForecast(obj.hourly);
          setDailyForecast(obj.daily);
          //} else {
          //  setForecast(false);
          //x}
        });
  }, [weather, latitude, longitude]);

  if (weather === false || weather == null) return <h1>Invalid Zipcode!</h1>;

  return (
    <div>
      {/* {JSON.stringify(forecast, undefined, 4)} */}
      <h1>{weather.name}</h1>
      <h2>{weather.weather[0].description} </h2>
      <h2>{weather.main.temp} °F</h2>

      <Button variant="contained" onClick={handleButton}>
        Switch Forecast
      </Button>

      {label && (
        <div>
          <h3>Hourly Forecast</h3>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            {hourlyForecast.map((forecast) => (
              <HourlyBlock forecast={forecast}></HourlyBlock>
            ))}
          </div>
        </div>
      )}

      {!label && (
        <div>
          <h3>Daily Forecast</h3>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            {dailyForecast.map((forecast) => (
              <DailyBlock forecast={forecast}></DailyBlock>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
