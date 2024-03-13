<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CityWeather;

class WeatherStackController extends Controller
{
    public function index(Request $request)
    {
       $city = $request->input('city');
       $city = urlencode($city);

       $cep = $request->input('cep');

       $curl = curl_init();

       curl_setopt_array($curl, array(
         CURLOPT_URL => "http://api.weatherstack.com/current?access_key=7b077defab4112c68a9f12f14b9240c9&query={$city}",
         CURLOPT_RETURNTRANSFER => true,
         CURLOPT_ENCODING => '',
         CURLOPT_MAXREDIRS => 10,
         CURLOPT_TIMEOUT => 0,
         CURLOPT_FOLLOWLOCATION => true,
         CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
         CURLOPT_CUSTOMREQUEST => 'GET',
       ));
       
       $response = curl_exec($curl);
       $response = json_decode($response);
    
       curl_close($curl);

       $cityWeather = new CityWeather();
        
       $cityWeather->cep =  $cep;
       $cityWeather->city = $response->location->name;
       $cityWeather->state = $response->location->region;
       $cityWeather->weather_icons = $response->current->weather_icons[0];
       $cityWeather->weather_descriptions = $response->current->weather_descriptions[0];
      $cityWeather->is_day = $response->current->is_day;
       $cityWeather->temperature = $response->current->temperature;
       $cityWeather->feelslike = $response->current->feelslike;
       $cityWeather->wind_speed =$response->current->wind_speed;
       $cityWeather->humidity = $response->current->humidity;
       $cityWeather->weather_code = $response->current->weather_code;

        $cityWeather->save();

       return response()->json($cityWeather, 200);
    }
}
