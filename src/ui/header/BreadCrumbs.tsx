import React from 'react';
import {Breadcrumbs, Link} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import GrainIcon from "@mui/icons-material/Grain";
import {PACKS, PROFILE, USERS} from "../routing/Routing";
import {useAppDispatch} from "../../utils/hooks";
import {setChatViewedAC} from "../../store/reducers/chat-reducer";
import s from './Header.module.css'


export const BreadCrumbs = () => {

    const dispatch = useAppDispatch()

    const openChat = () => {
        dispatch(setChatViewedAC(true))
    }

    return (
        <Breadcrumbs className={s.crumbs} >
            <Link
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                href={`#${PROFILE}`}
            >
                <HomeIcon sx={{mr: 0.5}}/>
                HOME
            </Link>
            <Link
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                href={`#${USERS}`}
            >
                <WhatshotIcon sx={{mr: 0.5}}/>
                USERS
            </Link>
            <Link
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                href={`#${PACKS}`}
            >
                <GrainIcon sx={{mr: 0.5}}/>
                PACKS
            </Link>
            <Link
                onClick={openChat}
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                style={{cursor: "pointer"}}
            >
                <ForumOutlinedIcon sx={{mr: 0.5}}/>
                CHAT
            </Link>
        </Breadcrumbs>
    );
};

export default BreadCrumbs;