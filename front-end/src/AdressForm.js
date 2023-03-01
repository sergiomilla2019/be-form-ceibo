import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function AddressForm() {


  return (
    <React.Fragment>
      <Typography style={{ marginTop: '5px' }} fontFamily={'"Titillium Web"'} variant="h5" gutterBottom>
        <b>Información</b>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography fontFamily={'"Titillium Web"'} variant="h6" gutterBottom>
            Fecha:  <b>12 de mayo</b>
          </Typography>
          <Typography fontFamily={'"Titillium Web"'} variant="h6" gutterBottom>
            Horario: <b>15:00 hs - ARG</b>
          </Typography>
          <Typography fontFamily={'"Titillium Web"'} variant="h6" gutterBottom>
            Plataforma:
            <br></br>
            <img src={'https://t3.ftcdn.net/jpg/03/66/36/54/360_F_366365492_EeArzf3MS8lWENqtAMExsZeIdxCIXyvc.jpg'} style={{
              maxWidth: 160,
              marginRight: '10px'
            }} />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontFamily={'"Titillium Web"'} variant="h6" gutterBottom>
            Vocero: <b>Hernán Gutsztat</b>
            <img src={'https://ceibo.digital/wp-content/uploads/2021/06/1-hernan.png'} style={{
              maxWidth: 110,
              marginRight: '10px',
              marginLeft: '30px',
              marginTop: '30px'
            }} />
          </Typography>
        </Grid>


        <Grid item xs={12} sm={6}>


        </Grid>


      </Grid>
    </React.Fragment>
  );
}