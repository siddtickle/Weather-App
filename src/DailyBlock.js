import React from "react";
import Box from "@material-ui/core/Box";

function DailyBlock({ forecast }) {
  const iconLink = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

  //Source: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
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
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + " " + date;
    return time;
  }

  return (
    <Box borderRadius={16} boxShadow={3} width={200} height={50}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {timeConverter(forecast.dt)}
        <img src={iconLink} alt={forecast.weather[0].description} />
        {forecast.temp.day} °F
      </div>
    </Box>
  );
}

export default DailyBlock;
