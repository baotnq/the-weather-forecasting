import React, { useState } from 'react';
import { Slider, Box, Button, Container, Grid, Link, } from '@mui/material';
import Search from './components/Search/Search';
import UTCDatetime from './components/Reusable/UTCDatetime';
import LoadingBox from './components/Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.png';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from './utilities/DataUtils';
import Weather from './components/TodayWeather/Weather';
import interact from 'interactjs'
import WeatherList from './components/TodayWeather/WeatherList';



function App() {
  const [enteredData, setEnteredData] = useState(null);
  const [city, setCity] = useState('');
  const [days, setForecastDays] = useState(3);
  const [listWeather, setListWeather] = useState([]);
  const searchChangeHandler = async (enteredData) => {
    console.log('searchChangeHandler',enteredData)
    setEnteredData(enteredData);
    setCity(enteredData.label);
  };
  const handleChange = (event, newValue) => {
    setForecastDays(newValue );
  };
  const addWeather = () => {
    let list = listWeather;
    let count = list.length + 1;
    let data = enteredData;
    data["days"] = days;
    list.push({id:count, data:data });
    setListWeather([...list]);
    console.log('todo',data);
  }
  function deleteWeather(id) {
    console.log('delete', id);
    let list = listWeather.filter(i => i.id != id);
    setListWeather([...list]);
  }
  const position = { x: 0, y: 0 }
  interact('.draggable').draggable({
    listeners: {
      start (event) {
        console.log(event.type, event.target)
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy
  
        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },
    }
  })

  function valuetext(value) {
    return `${value}`;
  }
  const marks = [
    { value: 0,  label: 'hide',   },
    { value: 1,  label: '1',  },
    { value: 2,  label: '2',  },
    { value: 3, label: '3',    },
  ];
  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '16px', sm: '22px', md: '26px' },
                width: 'auto',
              }}
              alt="logo"
              src={Logo}
            />

            <UTCDatetime />
            <Link
              href="https://github.com/baotnq/the-weather-forecasting/tree/gh-pages"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <GitHubIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'white',
                  '&:hover': { color: '#2d95bd' },
                }}
              />
            </Link>
          </Box>
          <Grid container sx={{padding:'10px'}} columnSpacing={4} rowSpacing={6}> 
                <Grid item md={5}>
                  <Search onSearchChange={searchChangeHandler} />
                </Grid>
                <Grid item md={3} >
                  <Slider
                    aria-label="Temperature"
                    value={days}
                    getAriaValueText={valuetext}
                    onChange={handleChange}
                    marks={marks}
                    step={1}
                    min={0}
                    max={6}
                  />
                </Grid>
                <Grid item md={2}>
                  <Button variant="contained" color="info" onClick={addWeather} > Add Weather </Button>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WeatherList data={listWeather} onDeleteTask={deleteWeather}></WeatherList>
    </Container>
  );
}

export default App;
