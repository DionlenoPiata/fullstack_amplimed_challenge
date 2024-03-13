export interface WeatherData {
  id?: number;
  city: string;
  state: string;
  weather_icons: string;
  weather_descriptions: string;
  is_day: string;
  cep: string;
  temperature: number;
  feelslike: number;
  wind_speed: number;
  humidity: number;
  weather_code: number;
  created_at?: date;
  updated_at?: date;
}
