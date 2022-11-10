import React from 'react';
import {Breadcrumbs, Link} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import {PACKS, PROFILE, USERS} from "../routing/Routing";

export const BreadCrumbs = () => {
    return (
        <Breadcrumbs style={{marginRight: "150px"}}>
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
        </Breadcrumbs>
    );
};

export default BreadCrumbs;