import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";


const useStyles = styled(({ theme }) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const FormPage = () => {
    const classes = useStyles();
    const location = useLocation();
    const { text } = location.state
    const [valores, setValores] = useState([[]]);
    const [matrix, setMatrix] = useState(Array.from({ length: text.length }, () => Array.from({ length: text.length }, () => ({ value: 0 }))))


    const handleChange = (event, j, i) => {
        let newMatrix = matrix.slice();
        newMatrix[i][j].value = event.target.value;
        setMatrix(newMatrix);
    };

    const handleClickSalvar = () => {
        let data = {};
        text.forEach((letra,i) => {
            text.forEach((elemento, j) => {
                if (i != j) {
                    var object = {}
                    object[elemento] = 0
                    data[letra] = { ...data[letra], ...object };
                }
            })
        })

        matrix.forEach((element, i) => {
            element.forEach((value, j) => {
                if (i != j) {
                    var key = text[j]
                    var elemento = text[i]
                    data[elemento][key] = value;
                }

            })
        });
        console.log(data)
        

    };

    const handleClickLimpar = (event) => {

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
                                        {i==j ? 
                                            <TextField
                                            id='outlined-basic'
                                            variant='outlined'
                                            type="number"
                                            disabled
                                            defaultValue={0}
                                            />
                                            :
                                            <TextField
                                            id='outlined-basic'
                                            variant='outlined'
                                            type="number"
                                            onChange={(e) => { handleChange(e, j, i) }}
                                            />
                                        }
                                        
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2} justify='flex-end'>
                <Grid item>
                    <Button variant='outlined' onClick={handleClickLimpar}>
                        Limpar
                    </Button>
                </Grid>

                <Grid item>
                    <Button variant='outlined' onClick={handleClickSalvar} color='primary'>
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default FormPage;


