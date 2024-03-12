<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('city_weather', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->string('state');
            $table->string('weather_icons');
            $table->string('weather_descriptions');
            $table->string('cep');
            $table->unsignedInteger('temperature');
            $table->unsignedInteger('feelslike');
            $table->unsignedInteger('wind_speed');
            $table->unsignedInteger('humidity');
            $table->unsignedInteger('weather_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('city_weather');
    }
};
