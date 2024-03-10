import React, { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

import ConsultForecast from "../ConsultForecast";
import WeatherInformationCard from "../WeatherInformationCard";
import { WeatherData } from "../../types";

const TabCompareForecasts: React.FC = () => {
  const [weatherOfCityOne, setWeatherOfCityOne] = useState<WeatherData | null>(
    null
  );
  const [weatherOfCityTwo, setWeatherOfCityTwo] = useState<WeatherData | null>(
    null
  );

  const handleWeatherOfCityOne = (data: WeatherData) => {
    setWeatherOfCityOne(data);
  };

  const handleWeatherOfCityTwo = (data: WeatherData) => {
    setWeatherOfCityTwo(data);
  };

  return (
    <>
      <div>Comparar a previsão do tempo de duas cidades</div>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <div>Primeira cidade</div>
            <ConsultForecast onDataReceived={handleWeatherOfCityOne} />
          </Grid>
          <Grid xs={12} md={6}>
            <div>Segunda cidade</div>
            <ConsultForecast onDataReceived={handleWeatherOfCityTwo} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <WeatherInformationCard weatherData={weatherOfCityOne} />
          </Grid>
          <Grid xs={12} md={6}>
            <WeatherInformationCard weatherData={weatherOfCityTwo} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TabCompareForecasts;
