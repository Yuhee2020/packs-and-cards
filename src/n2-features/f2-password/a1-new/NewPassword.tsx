import React, {useState} from "react";
import {useFormik} from 'formik';
import {Navigate, NavLink, useParams} from 'react-router-dom'
import {LOGIN, PASSWORD_CHANGED} from "../../../n1-main/m1-ui/routing/Routing";
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {setNewPasswordTC} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikErrorType = {
    password?: string
    confirmPassword?: string
}
type FormikValuesType = {
    password?: string
    confirmPassword?: string
}

const NewPassword = () => {
    const newPasswordStatus = useAppSelector(state => state.auth.newPasswordStatus);
    const dispatch = useAppDispatch();

    const {token} = useParams();

    const validate = (values: FormikValuesType) => {
        const errors: FormikErrorType = {};
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        } else if (values.confirmPassword.length < 8) {
            errors.confirmPassword = 'Password must be at least 8 characters';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password, token || ''))
        },
    });

    let [password, showPassword] = useState<boolean>(false);
    let [confirmPassword, showConfirmPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => {
        showPassword(true);
    };
    const handleMouseDownPassword = () => {
        showPassword(false);
    };
    const handleClickShowConfirmPassword = () => {
        showConfirmPassword(true);
    };
    const handleMouseDownConfirmPassword = () => {
        showConfirmPassword(false);
    };

    if (newPasswordStatus) {
        return <Navigate to={PASSWORD_CHANGED}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                <Paper elevation={14} style={{padding: "30px"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth>
                            <FormLabel style={{textAlign: "center"}}>
                                <h2>Password recovery</h2>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="New password"
                                    type={password ? 'text' : 'password'}
                                    variant="standard"
                                    error={formik.touched.password && !!formik.errors.password ? true : false}
                                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : " "}
                                    InputProps={{endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {password ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    {...formik.getFieldProps("password")}
                                />
                                <TextField
                                    label="Confirm new password"
                                    variant="standard"
                                    type={confirmPassword ? 'text' : 'password'}
                                    error={formik.touched.confirmPassword && !!formik.errors.confirmPassword ? true : false}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : " "}
                                    InputProps={{endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                            >
                                                {confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    {...formik.getFieldProps("confirmPassword")}
                                />
                                <FormLabel>
                                    <div style={{fontSize:"13px"}}>Think of a new password and enter it</div>
                                </FormLabel>
                                <Button style={{marginTop: "60px"}}
                                        type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                        disabled={formik.values.password != formik.values.confirmPassword}
                                        fullWidth>
                                    Change password
                                </Button>
                            </FormGroup>
                            <FormLabel style={{textAlign: "center"}}>
                                <h6 style={{color: "gray"}}>Did you remember your password?</h6>
                                <h4><NavLink to={LOGIN} style={{color: 'blue'}}>Try logging in</NavLink></h4>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NewPassword;