import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Grid } from "@mui/material";

const useStyles = styled(({ theme }) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
}));

const ColorButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'black',
  borderColor: 'black',
  '&:hover': {
    backgroundColor: '#FFFF00',
    borderColor: '#FFFF00',
    boxShadow: 'none',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const HomePage = () => {
  const [text, setText] = useState("");
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorText2, setErrorText2] = useState("");
  const classes = useStyles();
  const navigate = useNavigate()

  const handleTextChange = event => {
    setText(event.target.value);
  };

  const handleString2Change = event => {
    setString2(event.target.value);
    setError2(false)
    if (event.target.value.split("").filter((value) => {
      return !text.includes(value);
    }).length != 0) {
      setError2(true)
      setErrorText2("Inserção errada")
    }
  };

  const handleString1Change = event => {
    setString1(event.target.value);
    setError(false)
    if (event.target.value.split("").filter((value) => {
      return !text.includes(value);
    }).length != 0) {
      setError(true)
      setErrorText("Inserção errada")
    }
  };

  const handleConfirm = () => {
    if (string1 == "" || string2 == "" || text == "") {
      alert("Informe todos os dados");
    } else if (error == true || error2 == true) {
      alert("Dados Incorretos");
    } else if (text.length <= 1 || text.length >= 7) {
      alert("Alfabeto de tamanho incorreto");
    } else {
      let arrayText = text.split("");
      console.log(arrayText);
      navigate("/form", { state: { text: arrayText, string1: string1, string2: string2, gap: 0 } });
    }
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography variant="h6">
              Home Page
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <br />
      <Typography variant="h5" gutterBottom>
        Seja Bem vindo ao App, Informe o se alfabeto para que obtenha a sua resposta
      </Typography>
      <br />
      <Grid container direction="column" justifyContent="center" alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <TextField
          id="standard-full-width"
          label="Alfabeto"
          placeholder="Insira 2 a 6 letras"
          InputLabelProps={{
            shrink: true
          }}
          margin='normal'
          value={text}
          onChange={handleTextChange}
        />
        <TextField
          id="standard-full-width"
          label="Texto 1"
          margin='normal'
          error={error}
          helperText={errorText}
          placeholder="Use letras do Alfabeto"
          InputLabelProps={{
            shrink: true
          }}
          value={string1}
          onChange={(e) => handleString1Change(e)}
        />
        <TextField
          id="standard-full-width"
          label="Texto 2"
          error={error2}
          helperText={errorText2}
          margin='normal'
          placeholder="Use letras do Alfabeto"
          InputLabelProps={{
            shrink: true
          }}
          value={string2}
          onChange={(e) => handleString2Change(e)}
        />
        <ColorButton variant="contained" color="primary" onClick={handleConfirm}>
          Confirmar
        </ColorButton>

      </Grid>

    </div>
  );
};

export default HomePage;

