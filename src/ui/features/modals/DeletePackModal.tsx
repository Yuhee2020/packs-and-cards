import React, {useState} from 'react';
import {useAppDispatch} from "../../../utils/hooks";
import {deletePackTC} from "../../../bll/reducers/packs-reducer";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {BasicModal} from "./BasicModal";
import {PackType} from "../../../dal/packs-api";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MenuItem from "@mui/material/MenuItem";
import {PACKS} from "../../routing/Routing";
import {useNavigate} from "react-router-dom";

type PropsType = {
    pack: PackType
    text?:boolean
}
export const DeletePackModal = ({pack,text}: PropsType) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenClose = () => setOpen(!open);
    const deletePackHandler = () => {
        dispatch(deletePackTC(pack._id))
        handleOpenClose()
        navigate(PACKS)
    }


    return (
        <div>
            {text?<MenuItem
                onClick={handleOpenClose}>
                <ListItemIcon>
                    <DeleteOutlineIcon fontSize="small"/>
                </ListItemIcon>
                Delete
            </MenuItem>
                :<IconButton onClick={handleOpenClose}> <DeleteIcon fontSize="small"/> </IconButton>}
            <BasicModal title={'Delete pack'}
                        open={open}
                        handleOpenClose={handleOpenClose}
            >
                <Stack paddingTop={"10px"} direction={"column"} spacing={5} justifyContent={"space-evenly"}>
                    <div>Do you really want to remove <b>{pack.name}</b>?
                        All cards will be deleted.
                    </div>
                    <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                        <Button variant={'contained'} color={'primary'} onClick={handleOpenClose}>Cancel</Button>
                        <Button variant={'contained'} color={'error'} onClick={deletePackHandler}>Delete</Button>
                    </Stack>
                </Stack>
            </BasicModal>
        </div>
    )
}