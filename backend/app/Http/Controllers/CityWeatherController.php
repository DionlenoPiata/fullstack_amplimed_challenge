<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CityWeather;

class CityWeatherController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'city' => 'required|string',
            'state' => 'required|string',
            'weather_icons' => 'required|string',
            'weather_descriptions' => 'required|string',
            'cep' => 'required|string',
            'temperature' => 'required|numeric',
            'feelslike' => 'required|numeric',
            'wind_speed' => 'required|numeric',
            'humidity' => 'required|numeric',
            'weather_code' => 'required|numeric',
        ]);

        $cityWeather = new CityWeather();
        
        $cityWeather->city = $request->city;
        $cityWeather->state = $request->state;
        $cityWeather->weather_icons = $request->weather_icons;
        $cityWeather->weather_descriptions = $request->weather_descriptions;
        $cityWeather->cep = $request->cep;
        $cityWeather->temperature = $request->temperature;
        $cityWeather->feelslike = $request->feelslike;
        $cityWeather->wind_speed = $request->wind_speed;
        $cityWeather->humidity = $request->humidity;
        $cityWeather->weather_code = $request->weather_code;

        $cityWeather->save();

        return response()->json(['message' => 'City weather saved successfully'], 201);
    }
    public function index(Request $request)
    {
        $query = CityWeather::query();

        // Parâmetros da busca
        if ($request->has('city')) {
            $query->where('city', 'like', '%'.$request->get('city').'%');
        }

        if ($request->has('cep')) {
            $query->where('cep', 'like', '%'.$request->get('cep').'%');
        }

        // Paginação
        $weatherData = $query->paginate(10);

        return response()->json($weatherData);
    }

    public function show($id)
    {
        $cityWeather = CityWeather::find($id);

        if (!$cityWeather) {
            return response()->json(['message' => 'City weather not found'], 404);
        }

        return response()->json($cityWeather);
    }

    public function update(Request $request, $id)
    {
        $cityWeather = CityWeather::find($id);

        if (!$cityWeather) {
            return response()->json(['message' => 'City weather not found'], 404);
        }

        $request->validate([
            'city' => 'required|string',
            'state' => 'required|string',
            'weather_icons' => 'required|string',
            'weather_descriptions' => 'required|string',
            'cep' => 'required|string',
            'temperature' => 'required|numeric',
            'feelslike' => 'required|numeric',
            'wind_speed' => 'required|numeric',
            'humidity' => 'required|numeric',
            'weather_code' => 'required|numeric',
        ]);

        $cityWeather->city = $request->city;
        $cityWeather->state = $request->state;
        $cityWeather->weather_icons = $request->weather_icons;
        $cityWeather->weather_descriptions = $request->weather_descriptions;
        $cityWeather->cep = $request->cep;
        $cityWeather->temperature = $request->temperature;
        $cityWeather->feelslike = $request->feelslike;
        $cityWeather->wind_speed = $request->wind_speed;
        $cityWeather->humidity = $request->humidity;
        $cityWeather->weather_code = $request->weather_code;

        $cityWeather->save();

        return response()->json(['message' => 'City weather updated successfully'], 200);
    }

    public function destroy($id)
    {
        $cityWeather = CityWeather::find($id);

        if (!$cityWeather) {
            return response()->json(['message' => 'City weather not found'], 404);
        }

        $cityWeather->delete();

        return response()->json(['message' => 'City weather deleted successfully'], 200);
    }
   
}
