import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getUserTC} from "../../../../store/reducers/users-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import s from "../../profile/Profile.module.css";
import {Grid, Paper, Typography} from "@mui/material";
import gomer from "../../../common/images/Homer_Simpson.webp"
import {GoToPackList} from "../../cards/cardsPageHead/GoToPackList";

export const User = () => {
    const dispatch = useAppDispatch()
    const {userId} = useParams()
    const user=useAppSelector(state => state.users.user)

    useEffect(() => {
        userId && dispatch(getUserTC(userId))
    }, [userId, dispatch])


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
                            <div className={s.avatar} style={{backgroundImage: `url(${user.avatar?user.avatar:gomer})`}}>

                            </div>
                            <div style={{ fontSize: '20px'}}>
                               <span>{user.name}</span>
                            </div>
                            <Typography variant="h6" gutterBottom noWrap sx={{color: 'gray', margin: '10px 0 10px 0'}}>
                                {user.email}
                            </Typography>
                            <Typography gutterBottom noWrap sx={{color: 'gray', margin: '10px 0 10px 0'}}>
                                Packs count: {user.publicCardPacksCount}
                            </Typography>

                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

