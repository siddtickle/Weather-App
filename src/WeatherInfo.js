import React, { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_api_key;

function WeatherInfo({ weather, latitude, longitude }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const url = new URL(`https://api.openweathermap.org/data/2.5/onecall`);
    url.searchParams.append("lat", latitude);
    url.searchParams.append("lon", longitude);
    url.searchParams.append("appid", API_KEY);

    if (latitude !== undefined && longitude !== undefined)
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          // also important to check html error codes
          // 200 means no errors
          //if (obj.cod === 200) {
          setForecast(obj);
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
    </div>
  );
}

export default WeatherInfo;
