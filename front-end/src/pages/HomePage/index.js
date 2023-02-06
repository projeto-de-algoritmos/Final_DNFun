import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

const HomePage = () => {
  const [text, setText] = useState("");
  const classes = useStyles();
  const navigate = useNavigate()

  const handleTextChange = event => {
    setText(event.target.value);
  };

  const handleConfirm = () => {
    let arrayText = text.split("");
    console.log(arrayText);
    navigate("/form", { state: { text: arrayText} });

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home Page
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <Typography variant="h5" gutterBottom>
        Seja Bem vindo ao App, Informe o se alfabeto para que obtenha a sua resposta
      </Typography>
      <br />
      <TextField
        id="standard-full-width"
        label="Alfabeto"
        style={{ margin: 8}}
        placeholder="Insira o seu alfabeto (2 a 6 letras)"
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        value={text}
        onChange={handleTextChange}
        className={classes.textField}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  );
};

export default HomePage;

