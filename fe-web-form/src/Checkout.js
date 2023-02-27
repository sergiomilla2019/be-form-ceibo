import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import ceiboLogo from './assets/ceibo-logo.png'
import background from './assets/wallpaper.png'
import connie from './assets/Connie.png'
import moment from "moment";
import CalendarMonthIcon from '@mui/icons-material/EventAvailable'; import GoogleIcon from '@mui/icons-material/Google';
import { Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField } from '@mui/material';
import axios from 'axios';
import { useHref } from 'react-router-dom';
import Review from './Review';

import image from './assets/webinarMex.jpeg'

const ATCDropdown = (args) => (
  <ul>
    {console.log(args.children[2])}
    <Button
      style={{ width: '110px' }}
      variant="contained"
      sx={{ mt: 3, ml: 2 }}
      endIcon={<GoogleIcon />}
    >{args.children[0]}</Button>
  </ul>
);


const ATCWrapper = (args) => (
  <Button
    variant="contained"
    sx={{ mt: 3, ml: 1 }}
    onClick={args.onClick}
  >

    {'Agregar al calendario'}
  </Button>
);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundImage: `url(${background})`, backgroundSize: '100%'
    },
    title: {
      flexGrow: 1,
      textAlign: "center"
    },
    logo: {
      maxWidth: 140,
    }
  })
);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ceibo.digital/">
        Ceibo Digital
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = [''];

const theme = createTheme({
  palette: {
    primary: {
      main: '#B82837',
      darker: '#053e85',
    },
    neutral: {
      main: '#891924',
      contrastText: '#fff',
    },
    typography: {
      fontFamily: ['"Titillium Web"', 'sans-serif'].join(',')
    },
    background: {
      default: "#891924"
    },
  },
});

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [mail, setMail] = React.useState();
  const [company, setCompany] = React.useState();
  const [country, setCountry] = React.useState();
  const [newsletter, setNewsletter] = React.useState();
  const [question, setQuestion] = React.useState();

  const handleNext = () => {

    if (activeStep == 0) {
      if (!(firstName && lastName && mail)) {

        setActiveStep(activeStep + 1)
        alert('Debe completar todos los campos para registrarse')
      } else {
        axios.post(`https://events.ceibo.digital/api/registered?save=true`, {
          firstName: firstName,
          lastName: lastName,
          mail: mail,
          company: company,
          country: country,
          question: question,
          newsletter: newsletter ? true : false
        }).then(res => {
          axios.post(`https://events.ceibo.digital/api/notification`, {
            firstName: firstName,
            lastName: lastName,
            mail: mail,
            company: company,
            country: country,
            question: question,
            newsletter: newsletter ? true : false
          }).then(res => {
            setActiveStep(activeStep + 1)
          }).catch(err => {
          })
          setActiveStep(activeStep + 1)

        }).catch(err => {
          alert('El mail ya se encuentra registrado')
        })
      }
    } else {
      if (activeStep == 1) {
        /*   axios.post(`https://events.ceibo.digital/api/notification`, {
            firstName: firstName,
            lastName: lastName,
            mail: mail,
            company: company,
            country : country,
            question: question
          }).then(res => {
            setActiveStep(activeStep + 1)
          }).catch(err => {
          }) */

      } else {
        setActiveStep(activeStep + 1)
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <React.Fragment>
          <Typography fontFamily={'"Titillium Web"'} variant="h5" gutterBottom>
            <b>Suscribite al evento!</b>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Apellido"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="mail"
                name="mail"
                label="Mail"
                type="email"
                fullWidth
                variant="standard"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="company"
                name="company"
                label="Compañía"
                type="text"
                fullWidth
                variant="standard"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="country"
                name="country"
                label="País"
                type="text"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel style={{ fontFamily: '"Titillium Web"' }} id="demo-simple-select-standard-label" variant="standard" htmlFor="uncontrolled-native"> <b>¿Hay alguna pregunta que quieras hacerle a los speakers?</b></InputLabel>
              <TextField
                id="question"
                name="question"
                label=""
                type="text"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {/* <Select
                style={{ width: '300px' }}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                label="origin"
              >
                <MenuItem value="Seleccionar">
                </MenuItem>
                <MenuItem value={'Instagram de Ceibo'}>Instagram de Ceibo</MenuItem>
                <MenuItem value={'newsletter'}>LinkedIn de Ceibo</MenuItem>
                <MenuItem value={'Mail de Ceibo'}>Mail de Ceibo</MenuItem>
                <MenuItem value={'Connie Ansaldi'}>Connie Ansaldi</MenuItem>
                <MenuItem value={'Nicolás Balestrini'}>Nicolás Balestrini</MenuItem>
              </Select> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel style={{ marginTop: 10 }}
              label="Suscribirme al newsletter de Ceibo"
              control={<Checkbox checked={newsletter} onChange={() => setNewsletter(!newsletter)}
              />}
            />
          </Grid>
        </React.Fragment>;
      case 1:
        return <Review data={["asf", "af", "asf", "asf", "", "origen"]} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >

      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper elevation={24} sx={{ my: { xs: 3 } }}>
          <img style={{ width: '100%' }} src={image}></img>


          {/*    
          <Typography style={{ marginTop: '10px' }} fontFamily={'"Titillium Web"'} component="h1" variant="h4" align="center">
            <b> Webinar NFTs</b>

          </Typography> */}
          {/* <Typography style={{ marginTop: '10px' }} fontFamily={'"Titillium Web"'} component="h1" variant="h4" align="center">
            Webinar  {""}11/10<br />  <b> NFTs  con Connie Ansaldi </b>

          </Typography> */}

          <Container sx={{ p: { xs: 2, md: 3 } }}>
            <Typography fontFamily={'"Titillium Web"'} component="h3" variant="h5" align="center">

            </Typography>
            <br></br>
            {/*  <Stepper style={{ marginTop: '4px',  marginBottom: '10px' }} activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography style={{ marginTop: '3px' }} fontFamily={'"Titillium Web"'} variant="h5" gutterBottom>
                    Gracias por suscribirte
                    <br></br> te recomendamos que agendes el evento!
                  </Typography>
                  <a target="_blank" href='https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NnJkcjVuaWtvM2NoYTljMzcydHNjbnY4bDYgcHJlbnNhQGNlaWJvLmRpZ2l0YWw&tmsrc=prensa%40ceibo.digital'>
                    <Button
                      style={{ alignItems: 'center' }}
                      variant="contained"
                      sx={{ mt: 3, ml: 2, pl: 1 }}
                      endIcon={<CalendarMonthIcon style={{ fontSize: 30 }} />}
                    ></Button>
                  </a>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 1, ml: 1 }}>
                        Volver
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={
                        handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Suscribirme' : 'Continuar'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>

          </Container>

        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
