import React from "react";
import Box from "@material-ui/core/Box";

function HourlyBlock({ forecast }) {
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
        <img src={iconLink} alt={forecast.weather[0].description} />
        {forecast.temp} °F
      </div>
    </Box>
  );
}

export default HourlyBlock;
