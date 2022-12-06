import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GrainIcon from '@mui/icons-material/Grain';
import SchoolIcon from '@mui/icons-material/School';
import {useAppSelector} from "../../../../utils/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {EditPackModal} from "../../packs/packsModals/EditPackModal";
import {DeletePackModal} from "../../packs/packsModals/DeletePackModal";

export const Menushka = () => {
    const navigate = useNavigate()
    const {packId}=useParams()
    const pack=useAppSelector(state => state.packs.cardPacks.find(p=>p._id===packId))
    const cards = useAppSelector(state => state.cards)
    const isMyPack = useAppSelector(state => state.cards.isMyPack)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    }
    const learnPackHandler = (packId: string) => {
        navigate(`/learn/${packId}`)
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Pack actions">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 1}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <GrainIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <div key={"jjj"}>
                {isMyPack && pack && <>
                        <EditPackModal pack={pack} text/>
                        <DeletePackModal pack={pack} text/>
                    </>}
                {!!cards.cards.length && <MenuItem
                    onClick={() => learnPackHandler(cards.cardsPackId)}>
                    <ListItemIcon>
                        <SchoolIcon fontSize="small"/>
                    </ListItemIcon>
                    Learn
                </MenuItem>}
                </div>
            </Menu>
        </React.Fragment>
    );
}
