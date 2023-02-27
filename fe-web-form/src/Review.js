import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';


export default function Review(props) {
  // const [data] = React.useState('');
  console.log(props.data)
  return (
    <React.Fragment>
      <Typography style={{marginTop:'5px'}} fontFamily={'"Titillium Web"'} variant="h5" gutterBottom>
        <b>Datos del usuario:</b>
      </Typography>
      <List disablePadding>
        <ListItemText primary={'Nombre y apellido/s'} secondary={props.data[0] + ' ' + props.data[1]} />
        <ListItemText primary={'Email'} secondary={props.data[2]} />
        <ListItemText primary={'Empresa'} secondary={props.data[3]} />
        <ListItemText primary={'Cargo'} secondary={props.data[4]} />
      </List>


      <Typography fontFamily={'"Titillium Web"'} variant="h5" gutterBottom sx={{ mt: 2 }}>
        <b>Datos del evento:</b>
      </Typography>
      <List disablePadding>
        <ListItemText primary={'Tema'} secondary={'Fintech'} />
        <ListItemText primary={'Vocero'} secondary={'Hernán Gutsztat'} />
        <ListItemText primary={'Fecha y hora'} secondary={'12 de mayo a las 15:00 hs - ARG'} />
        <ListItemText primary={'Plataforma'} secondary={'Zoom'} />
      </List>


    </React.Fragment>
  );
}
