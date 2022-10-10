import React from "react";
import {NavLink} from "react-router-dom";
import {AppBar, Avatar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../utils/hooks";
import {LOGIN, PROFILE} from "../routing/Routing";

const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userName = useAppSelector(state => state.profile.name);
    const userAvatar = useAppSelector(state => state.profile.avatar);

    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontSize={'24px'}>
                    Learning Cards
                </Typography>
                {
                isLoggedIn
                    ? <div style={{display: "flex", justifyContent: "center", alignItems: "center", minWidth: "300px"}}>
                        <NavLink style={{textDecoration: 'none', color: 'white'}} to={PROFILE}>{userName}</NavLink>
                        <Avatar alt={userName} src={userAvatar} style={{marginLeft: '10px'}} />
                </div>
                    : <Button  variant="contained" color="secondary" style={{
                    borderRadius: 35,
                    backgroundColor: "white",
                }}><NavLink style={{textDecoration: 'none', color: 'black', textTransform: "capitalize"}} to={LOGIN}>Log In</NavLink>
                    </Button>
            }
            </Toolbar>
        </AppBar>

    </Box>
    )
}

export default Header;