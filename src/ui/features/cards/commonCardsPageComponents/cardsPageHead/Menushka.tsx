import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GrainIcon from '@mui/icons-material/Grain';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SchoolIcon from '@mui/icons-material/School';
import {useAppDispatch, useAppSelector} from "../../../../../utils/hooks";
import {deletePackTC, updatePackTC} from "../../../../../bll/reducers/packs-reducer";
import {useNavigate} from "react-router-dom";
import {PACKS} from "../../../../routing/Routing";

export const Menushka = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
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
    const updatePack = () => {
        dispatch(updatePackTC({_id: cards.cardsPackId, name: "The best of the best"}))
    }
    const deletePack = () => {
        dispatch(deletePackTC(cards.cardsPackId))
        navigate(PACKS)
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
                onClick={handleClose}
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
                {isMyPack && <><MenuItem
                    onClick={updatePack}>
                    <ListItemIcon>
                        <BorderColorIcon fontSize="small"/>
                    </ListItemIcon>
                    Edit
                </MenuItem>
                    <MenuItem
                        onClick={deletePack}>
                        <ListItemIcon>
                            <DeleteOutlineIcon fontSize="small"/>
                        </ListItemIcon>
                        Delete
                    </MenuItem></>}
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
