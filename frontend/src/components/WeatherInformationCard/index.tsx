import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { WeatherData } from "../../types";
import { CODES_CONDITIONS } from "./constants";

interface WeatherInformationCardProps {
  weatherData: WeatherData | null;
}

const WeatherInformationCard: React.FC<WeatherInformationCardProps> = ({
  weatherData,
}) => {
  const today = new Date();

  return (
    <>
      {weatherData ? (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={"column"}
            width={"100%"}
          >
            <Typography variant="h6">
              Clima para Hoje {today.getDate()}/{today.getMonth() + 1} em{" "}
              {weatherData.location.name} - {weatherData.location.region}
            </Typography>

            <Box display="flex" width="300" height="300" flexDirection="column">
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                m={2}
              >
                <img
                  src={weatherData.current.weather_icons[0]}
                  alt={weatherData.current.weather_descriptions[0]}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                {weatherData.current.is_day === "yes" ? (
                  <Typography variant="subtitle1">Dia</Typography>
                ) : (
                  <Typography variant="subtitle1">Noite</Typography>
                )}
              </Box>
              <Paper sx={{ padding: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Temperatura:</Typography>
                  <Typography variant="h6">
                    {weatherData.current.temperature} °C
                  </Typography>
                </Box>
                <br />

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Sensação térmica:</Typography>
                  <Typography variant="subtitle1">
                    {weatherData.current.feelslike} °C
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    Velocidade do vento:
                  </Typography>
                  <Typography variant="subtitle1">
                    {weatherData.current.wind_speed} Km/h
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Umidade do ar:</Typography>
                  <Typography variant="subtitle1">
                    {weatherData.current.humidity}%
                  </Typography>
                </Box>
                <br />
                <Typography variant="subtitle2">
                  {
                    CODES_CONDITIONS.find(
                      (code) =>
                        parseInt(code.code) === weatherData.current.weather_code
                    )?.description
                  }
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          width={"100%"}
          height={300}
        >
          Informe o CEP e clique em consultar para obter o clima da cidade
        </Box>
      )}
    </>
  );
};

export default WeatherInformationCard;
