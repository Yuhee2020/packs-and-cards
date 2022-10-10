import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper} from "@mui/material";
import {LOGIN} from "../../../n1-main/m1-ui/routing/Routing";
import {NavLink} from "react-router-dom";
import emailImg from "../../../n1-main/m1-ui/common/img/email.png"
import {useAppSelector} from "../../../n1-main/m1-ui/hooks";

const PasswordIsRecovered = () => {
    const email = useAppSelector(state => state.auth.email);

    return (
        <Grid container justifyContent={'center'}>
            <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                <Paper elevation={14} style={{padding: "30px"}}>

                    <FormControl fullWidth>
                        <FormLabel style={{textAlign: "center"}}>
                            <h2>Check Email</h2>
                        </FormLabel>
                        <FormGroup>

                            <FormLabel>
                                <img src={emailImg} style={{width:"100px"}} alt={"email"}/>
                                <div style={{fontSize: "13px"}}>We have sent an Email with instructions to {email}
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

export default PasswordIsRecovered;

