import React from 'react';
import {NavLink} from "react-router-dom";
import {LOGIN, PROFILE} from "../routing/Routing";
import {Avatar, Button} from "@mui/material";
import {useAppSelector} from "../../utils/hooks";

const RightZone = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userName = useAppSelector(state => state.profile.name);
    const userAvatar = useAppSelector(state => state.profile.avatar);
    return (
        isLoggedIn
            ? <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                <NavLink style={{textDecoration: 'none', color: 'white'}} to={PROFILE}>{userName}</NavLink>
                <Avatar alt={userName} src={userAvatar} style={{marginLeft: '10px'}}/>
            </div>
            : <Button variant="contained" color="secondary" style={{
                borderRadius: 35,
                backgroundColor: "white",
            }}><NavLink style={{textDecoration: 'none', color: 'black', textTransform: "capitalize"}} to={LOGIN}>Log
                In</NavLink>
            </Button>

    )
};

export default RightZone;