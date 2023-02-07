import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios"
import { purple } from '@mui/material/colors';

const useStyles = styled(({ theme }) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#000000 !important',
        color: '#000000 !important'
    }

}));

// const ColorButton = styled(Button)(({ theme }) => ({
//     color: purple[500],
//     backgroundColor: purple[500],
//     borderColor: '#0063cc',
//     '&:hover': {
//       backgroundColor: purple[700],
//     },
//   }));

const FormPage = () => {
    const classes = useStyles();
    const location = useLocation();
    const { text, string1, string2, gap } = location.state
    const [matrix, setMatrix] = useState(Array.from({ length: text.length }, () => Array.from({ length: text.length }, () => ({ value: 0 }))))
    const navigate = useNavigate()

    const handleChange = (event, j, i) => {
        let newMatrix = matrix.slice();
        newMatrix[i][j].value = event.target.value;
        setMatrix(newMatrix);
    };

    const handleClickSalvar = () => {
        let data = {};
        text.forEach((letra, i) => {
            text.forEach((elemento, j) => {
                var object = {}
                object[elemento] = 0
                data[letra] = { ...data[letra], ...object };
            })
        })

        matrix.forEach((element, i) => {
            element.forEach((value, j) => {
                console.log(typeof (value.value))
                var key = text[j]
                var elemento = text[i]
                data[elemento][key] = Number.parseInt(value.value);
            })
        });

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post('http://localhost:8000/check/', {
            s1: string1,
            s2: string2,
            alpha: data,
            gap: gap,
        },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            .then(function (response) {
                navigate("/result", { state: { response: response.data } });
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const handleClickLimpar = (event) => {

    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Form Page
                    </Typography>
                </Toolbar>
            </AppBar>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Letras</TableCell>
                            {text.map((letra, index) => (
                                <TableCell key={index}>{letra}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {text.map((letra, i) => (
                            <TableRow key={i}>
                                <TableCell>{letra}</TableCell>
                                {text.map((c, j) => (
                                    <TableCell key={j}>
                                        <TextField
                                            id='outlined-basic'
                                            variant='outlined'
                                            type="number"
                                            onChange={(e) => { handleChange(e, j, i) }}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container spacing={2} justify-items='flex-end'>
                <Grid item>
                    <Button variant='contained' color="primary" onClick={handleClickLimpar}>
                        Limpar
                    </Button>
                </Grid>

                <Grid item justify='flex-end'>
                    <Button variant="contained" color="primary" onClick={handleClickSalvar} >
                        Salvar
                    </Button>
                </Grid>
            </Grid>

        </div>
    );
};

export default FormPage;


