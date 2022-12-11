import React from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import cards from "../common/images/cards.png"
import s from "./Header.module.css"
import BreadCrumbs from "./BreadCrumbs";
import RightZone from "./RightZone";

const Header = () => {

    const mediaQuery = window.matchMedia('(min-width: 920px)')

    return (<Box>
        <AppBar position="relative">
            <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
                {mediaQuery.matches &&
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><img className={s.cards}
                                                                                                     src={cards}
                                                                                                     alt={"cards"}/>
                    <Typography variant="h6" component="div" fontSize={'24px'}>
                        Packs and cards
                    </Typography>
                </div>
                }
                <BreadCrumbs/>
                <RightZone/>
            </Toolbar>
        </AppBar>
    </Box>
    )
}

export default Header;