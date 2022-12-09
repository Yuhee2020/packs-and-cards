import React, {useCallback, useEffect} from "react";
import SuperEditableSpan from "../../common/EditablSpan/EditablSpan";
import {Navigate} from "react-router-dom";
import {changeNameAC, changeProfileInfoTC} from "../../../store/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {logoutTC} from "../../../store/reducers/auth-reducer";
import {LOGIN} from "../../routing/Routing";
import s from './Profile.module.css';
import {Button, Grid, Paper, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {GoToPackList} from "../cards/cardsPageHead/GoToPackList";
import {ChangeAva} from "./ChangeAva";
import {Chat} from "../chat/Chat";

const Profile = () => {

    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.profile.name);
    const avatar = useAppSelector(state => state.profile.avatar);
    const email = useAppSelector(state => state.profile.email);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    useEffect(()=>{
        dispatch(changeProfileInfoTC(name,avatar))
    },[name,avatar,dispatch])

    const setNewName = useCallback((name: string) => {
        dispatch(changeNameAC(name));
    }, [dispatch, name,]);

    const logout = ()=> {
        dispatch(logoutTC());
    }

    if (!isLoggedIn) {
        return <Navigate to={LOGIN}/>
    }

    return (
        <div className={s.container}>
            <GoToPackList/>
            <Grid container justifyContent={'center'}>
                <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                    <Paper elevation={14} style={{padding: "30px"}}>
                        <div className={s.profileBox}>
                            <Typography variant="h5" gutterBottom noWrap sx={{fontWeight: 'bold'}}>
                                Personal Information
                            </Typography>
                            <div className={s.avatar}>
                                <img alt="avatar" src={avatar} className={s.avatarImg}/>
                               <ChangeAva/>
                            </div>
                            <div className={s.name}>
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
};

export default Profile;