import React, { useEffect, useState } from "react";
import './styles.css';
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { AppBar, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});



const ResultPage = () => {

  const location = useLocation();
  const { response } = location.state;
 
  const [s1, setS1] = useState(response[0])//response[0]);
  const [s2, setS2] = useState(response[1])//response[1]);
  const [val, setVal] = useState(response[2])//response[2]);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    setFlags(s1.split('').map((val, ind) => {
      return (val === '-' || s2[ind] === '-') ? true : val === s2[ind];
    }));
  }, [])



  return (<article className='root'>
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Result Page
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
    <h1> Resultado: </h1>
    <div className= 'string-div'>
      {s1.split('').map(
        (c, ind) => <p key={ind} className={c === '-' ? 'edit-good' : 'edit-default'}> {c} </p>
      )}
    </div>
    <div className="string-div">
      {s2.split('').map(
        (c, ind) => <p key={ind} className={flags[ind] ? 'edit-good' : 'edit-change'}> {c} </p>
      )}
    </div>

    <div className="string-div">
      <p> Custo de edição: {val} </p>
    </div>
  </article>);
};

export default ResultPage;
