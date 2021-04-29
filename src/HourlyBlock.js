import React from "react";
import Box from "@material-ui/core/Box";

function HourlyBlock({ forecast }) {
  //Source: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  let unix_timestamp = forecast.dt;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Will display time in 10:30 format
  var formattedTime = hours + ":" + minutes.substr(-2);

  //   console.log(formattedTime);

  const iconLink = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

  return (
    <Box borderRadius={16} boxShadow={3} width={200} height={50}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {formattedTime}
        <img src={iconLink} alt={forecast.weather[0].description} />
        {forecast.temp} °F
      </div>
    </Box>
  );
}

export default HourlyBlock;
