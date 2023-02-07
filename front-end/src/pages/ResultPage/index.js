import React, { useEffect, useState } from "react";
import './styles.css';
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const useStyles = styled(({ theme }) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'center'
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

 
const ResultPage = () => {

  const location = useLocation();
  const { response } = location.state;
  const classes = useStyles();
  const [s1, setS1 ]= useState(response[0])//response[0]);
  const [s2, setS2] = useState(response[1])//response[1]);
  const [val, setVal]= useState(response[2])//response[2]);
  const [flags, setFlags]= useState([]);

  useEffect(() => {
    setFlags(s1.split('').map((val, ind) => {
      return (val === '-'|| s2[ind] === '-') ? true: val === s2[ind];
    }));
   }, [flags])

  

  return (<article className={classes.root}>
    <h1> Resultado: </h1>
    <div className={classes.root + ' string-div'}>
    {s1.split('').map(
      (c, ind) => <p key={ind} className={c === '-'? 'edit-good':'edit-default'}> {c} </p>
    )} 
    </div>
    <div className="string-div">
    {s2.split('').map(
      (c, ind) => <p key={ind} className={flags[ind]? 'edit-good':'edit-change'}> {c} </p>
    )} 
    </div>
  </article>);
};

export default ResultPage;
