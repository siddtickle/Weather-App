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

  const iconLink = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  //source: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      month + " " + date + " " + year + ", " + hour + ":" + min + ":" + sec;
    return time;
  }
  // console.log(timeConverter(weather.dt));

  return (
    <div>
      {/* {JSON.stringify(forecast, undefined, 4)} */}
      <div>
        <h1>{weather.name}</h1>
        <img src={iconLink} alt={weather.weather[0].description} />
        <h3>{weather.weather[0].description} </h3>
        <h3>{weather.main.temp} °F</h3>
        <h3>{timeConverter(weather.dt)}</h3>
      </div>
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
              class="forecast"
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
