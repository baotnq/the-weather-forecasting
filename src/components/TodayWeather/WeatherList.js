import Weather from './Weather';
import { Grid, Button, IconButton, Typography } from '@mui/material';

const WeatherList = ({data, onDeleteTask}) => {
  if (data && data.length > 0) {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} > 
        {data.map((item) => (
          <Grid className="draggable" 
          sx={{ padding: '1rem 0 3rem',       marginBottom: '1rem',
              borderRadius: {
                xs: 'none',
                sm: '1rem 1rem 1rem 1rem',
              },
              boxShadow: {
                xs: 'none',
                sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
              },
          }}
        key={item.id} item xs={6} md={6} > 
            <Button sx={{ position: "fixed", zIndex: 2000 }}
                variant="contained" color="info" onClick={() => onDeleteTask(item.id)} >X</Button>
            <Weather enteredData={item.data} city={item.city}> </Weather> 
        </Grid>
        ))}
      </Grid>
    );
        }
}

export default WeatherList;