import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/Input";
import WeatherInfo from "./WeatherInfo";

const API_KEY = process.env.REACT_APP_api_key;
function App() {
  const [zipcode, setZipcode] = useState("22904");

  const formChanged = (event) => {
    setZipcode(event.target.value);
  };

  const [weather, setWeather] = useState(null);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("zip", zipcode);
    url.searchParams.append("units", "imperial");
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode))
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          // also important to check html error codes
          // 200 means no errors
          if (obj.cod === 200) {
            setWeather(obj);
            // console.log(obj.coord);
            setLongitude(obj.coord.lon);
            setLatitude(obj.coord.lat);
          } else {
            setWeather(false);
          }
        });
  }, [zipcode]);

  return (
    <div style={{ textAlign: "center" }}>
      {/* <pre>{JSON.stringify(weather, undefined, 4)}</pre> */}

      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TextField
          placeholder="enter a zipcode"
          variant="outlined"
          onChange={formChanged}
          type="number"
        />
        <WeatherInfo
          weather={weather}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </div>
  );
}
export default App;
