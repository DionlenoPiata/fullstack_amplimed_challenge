import React, { useState } from "react";
import ConsultForecast from "../ConsultForecast";
import WeatherInformationCard from "../WeatherInformationCard";
import { WeatherData } from "../../types";

const TabConsultForecast: React.FC = () => {
  const [weatherOfCity, setWeatherOfCity] = useState<WeatherData | null>(null);

  const handleWeatherOfCity = (data: WeatherData) => {
    setWeatherOfCity(data);
  };

  return (
    <>
      <div>Consultar o clima em uma cidade</div>
      <ConsultForecast onDataReceived={handleWeatherOfCity} />
      <WeatherInformationCard weatherData={weatherOfCity} />
    </>
  );
};

export default TabConsultForecast;
