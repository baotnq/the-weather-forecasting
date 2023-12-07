import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TodayWeather from './TodayWeather';
import WeeklyForecast from '../WeeklyForecast/WeeklyForecast';
import { transformDateFormat } from '../../utilities/DatetimeUtils';

import { getTodayForecastWeather, getWeekForecastWeather } from '../../utilities/DataUtils'
import { ALL_DESCRIPTIONS } from '../../utilities/DateConstants';
import { fetchWeatherData } from '../../api/OpenWeatherService';

const Weather = ({ enteredData }) => {
  // console.log('city', city)
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [forecastDays, setForecastDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (enteredData && enteredData.value) {
      searchChangeHandler()
    }
  }, [enteredData]);
  const searchChangeHandler = async () => {
    const [latitude, longitude] = enteredData.value.split(' '); 
    let city = enteredData["label"];
    let days = enteredData["days"] || 0;
    if (days > 0) setForecastDays(days);
    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: city, ...todayWeatherResponse });
     
      console.log('all_week_forecasts_list', days,all_week_forecasts_list.slice(0,days))
      setWeekForecast({
        city: city,
        list: all_week_forecasts_list.slice(0,days),
      });
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };
  let showNumber = 12;
  if (todayWeather && todayForecast && forecastDays) {
    return (
      <>
        <Grid item xs={12} md={todayWeather ? showNumber : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={showNumber}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </>
    );
  }else if (todayWeather && todayForecast) {
    return (
      <>
        <Grid item xs={12} md={todayWeather ? showNumber : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Weather;
