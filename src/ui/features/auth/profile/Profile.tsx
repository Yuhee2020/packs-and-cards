import React, {useCallback, useEffect} from "react";
import SuperEditableSpan from "../../../common/EditablSpan/EditablSpan";
import {Navigate} from "react-router-dom";
import {changeNameAC, changeProfileInfoTC} from "../../../../bll/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {logoutTC} from "../../../../bll/reducers/auth-reducer";
import {LOGIN} from "../../../routing/Routing";
import s from './Profile.module.css';
import {Button, Grid, Paper, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {BackToPackList} from "../../cards/commonCardsPageComponents/BackToPackList";
import {ChangeAva} from "./ChangeAva";

const Profile = React.memo(() => {

    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.profile.name);
    const avatar = useAppSelector(state => state.profile.avatar);
    const email = useAppSelector(state => state.profile.email);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    useEffect(()=>{
        dispatch(changeProfileInfoTC(name,avatar))
    },[name,avatar])

    const setNewName = useCallback((name: string) => {
        dispatch(changeNameAC(name));
    }, [dispatch, name]);

    const logout = useCallback(() => {
        dispatch(logoutTC());
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={LOGIN}/>
    }

    return (
        <div className={s.container}>
            <BackToPackList/>
            <Grid container justifyContent={'center'}>
                <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                    <Paper elevation={14} style={{padding: "30px"}}>
                        <div className={s.profileBox}>
                            <Typography variant="h5" gutterBottom noWrap sx={{fontWeight: 'bold'}}>
                                Personal Information
                            </Typography>
                            <div className={s.avatar} style={{backgroundImage: `url(${avatar})`}}>
                               <ChangeAva/>
                            </div>
                            <div style={{cursor: 'pointer', fontSize: '20px'}}>
                                <SuperEditableSpan value={name} onChange={setNewName}/>
                            </div>
                            <Typography variant="h6" gutterBottom noWrap sx={{color: 'gray', margin: '10px 0 10px 0'}}>
                                {email}
                            </Typography>
                            <Button variant={'contained'}
                                    onClick={logout}
                                    color={'primary'}
                                    sx={{display: 'flex', justifyContent: 'space-around'}}
                                    fullWidth>
                                <LogoutIcon/>
                                Log out
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
});

export default Profile;