import React from 'react';
import {Breadcrumbs, Link} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

export const BreadCrumbs = () => {
    return (
        <Breadcrumbs style={{marginRight: "150px"}}>
            <Link
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                href="/"
            >
                <HomeIcon sx={{mr: 0.5}}/>
                MUI
            </Link>
            <Link
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                href="/material-ui/getting-started/installation/"
            >
                <WhatshotIcon sx={{mr: 0.5}}/>
                Core
            </Link>
            <Link
                underline="hover"
                sx={{display: 'flex', alignItems: 'center'}}
                color="yellow"
                href="/material-ui/getting-started/installation/"
            >
                <GrainIcon sx={{mr: 0.5}}/>
                Breadcrumb
            </Link>
        </Breadcrumbs>
    );
};

export default BreadCrumbs;