import React, { useState, useEffect, useCallback } from "react";
import { TextField, Grid, LinearProgress } from "@mui/material";
import debounce from "lodash.debounce";
import { WeatherData } from "../../types";
import WeatherInformationHistoricCard from "../WeatherInformationHistoricCard";

const TabHistoric: React.FC = () => {
  // pode consultar por cep ou cidqde
  // adicionar paginação

  // listar o histórico de previsões do tempo ordenado de forma decrescente

  const [weathers, setWeathers] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((nextValue) => fetchData(nextValue), 1000),
    []
  );

  const fetchData = async (nextValue?: string) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/city-weathers${
        nextValue ? `?city=${nextValue}` : ""
      }`
    );
    const data = await response.json();
    setWeathers(data);
    setLoading(false);
  };

  const handleSearchChange = async (event: any) => {
    setLoading(true);
    const { value: nextValue } = event.target;
    debouncedSearch(nextValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Consultar o histórico de previsões do tempo
      <br />
      <br />
      <TextField
        fullWidth
        label=""
        id="fullWidth"
        placeholder="Digite o nome da cidade para pesquisar"
        onChange={handleSearchChange}
      />
      <br />
      <br />
      {loading && (
        <Grid xs={12}>
          <LinearProgress />
        </Grid>
      )}
      {weathers.reverse().map((weather) => (
        <WeatherInformationHistoricCard
          key={weather.id}
          weatherData={weather}
        />
      ))}
    </div>
  );
};

export default TabHistoric;
