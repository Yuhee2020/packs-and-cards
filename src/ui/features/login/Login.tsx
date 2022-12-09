import React, {useEffect, useState} from "react";
import {useFormik} from 'formik';
import {loginTC} from "../../../store/reducers/auth-reducer";
import {Navigate, NavLink} from 'react-router-dom';
import {PASSWORD_RECOVERY, PROFILE, REGISTRATION} from "../../routing/Routing";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {changePasswordRecoveryStatusAC} from "../../../store/reducers/auth-reducer";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormikValuesType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(changePasswordRecoveryStatusAC(false,""))
    },[dispatch])
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const validate = (values: FormikValuesType) => {
        const errors: FormikErrorType = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Must be mo then 8 symbols';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });
    if (isLoggedIn) {
        return <Navigate to={PROFILE}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item marginTop={'50px'} textAlign={"center"} width={"400px"}>
                <Paper elevation={14} style={{padding: "30px", height:"430px"}} >
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth>
                            <FormLabel style={{textAlign: "center"}}>
                                <h2>Sign in</h2>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    helperText={formik.touched.email && !!formik.errors.email ? formik.errors.email : " "}
                                    variant="standard"
                                    type="text"
                                    error={formik.touched.email && !!formik.errors.email}
                                    {...formik.getFieldProps('email')}
                                />
                                <TextField
                                    label="Password"
                                    helperText={formik.touched.password && !!formik.errors.password ? formik.errors.password : " "}
                                    variant="standard"
                                    type={showPassword ? 'text' : 'password'}
                                    error={formik.touched.password && !!formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...formik.getFieldProps('password')}

                                />
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox
                                                      checked={formik.values.rememberMe}
                                                      {...formik.getFieldProps("rememberMe")}
                                                  />}/>
                                <h6 style={{textAlign: 'right'}}><NavLink to={PASSWORD_RECOVERY} style={{
                                    color: 'gray',
                                    textDecoration: 'none'
                                }}>Forgot password?</NavLink></h6>
                                <Button type={'submit'} variant={'contained'} color={'primary'} fullWidth>
                                    Sign In
                                </Button>
                            </FormGroup>
                            <FormLabel style={{textAlign: "center"}}>
                                <h6 style={{color: "gray"}}>Already have an account?</h6>
                                <h4><NavLink to={REGISTRATION} style={{color: 'blue'}}>Sign Up</NavLink></h4>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;