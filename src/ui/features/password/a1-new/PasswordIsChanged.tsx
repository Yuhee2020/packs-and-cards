import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper} from "@mui/material";
import {LOGIN} from "../../../routing/Routing";
import {NavLink} from "react-router-dom";
import successful from "../../../common/img/successful.png";

const PasswordIsChanged = () => {
    return (
        <Grid container justifyContent={'center'}>
            <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                <Paper elevation={14} style={{padding: "30px"}}>

                    <FormControl fullWidth>
                        <FormLabel style={{textAlign: "center"}}>
                            <h2>Password changed successfully</h2>
                        </FormLabel>
                        <FormGroup>

                            <FormLabel>
                                <img src={successful} style={{width:"130px"}} alt={"password"}/>
                                <div style={{fontSize: "13px"}}>Go back to the login page and check it out
                                </div>
                            </FormLabel>

                            <Button
                                style={{marginTop: "60px"}}
                                type={'submit'} variant={'contained'}
                                color={'primary'} fullWidth>
                                <NavLink to={LOGIN} style={{color: 'white', textDecoration: 'none'}}>
                                Back to login
                                </NavLink>
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PasswordIsChanged;

