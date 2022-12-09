import React from "react";
import Header from "../header/Header";
import Routing from "../routing/Routing";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {Backdrop, CircularProgress} from "@mui/material";
import {useAppSelector} from "../../utils/hooks";
import {Chat} from "../features/chat/Chat";


const Main = () => {
    const status = useAppSelector((state) => state.app.status)
    return (
        <div>
            <Backdrop open={status === 'loading'} sx={{color: '#fff', zIndex: 10}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <ErrorSnackbar/>
            <Header/>
            <Routing/>
            <Chat/>
        </div>
    )
}

export default Main;