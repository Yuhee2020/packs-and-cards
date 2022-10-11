import React, {useState} from 'react';
import {useAppDispatch} from "../../../utils/hooks";
import {deletePackTC} from "../../../bll/reducers/packs-reducer";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {BasicModal} from "./BasicModal";
import {PackType} from "../../../dal/packs-api";

type PropsType = {
    pack: PackType
}
export const DeletePackModal = ({pack}: PropsType) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenClose = () => setOpen(!open);
    const deletePackHandler = () => {
        dispatch(deletePackTC(pack._id))
        handleOpenClose()
    }


    return (
        <div>
            <IconButton onClick={handleOpenClose}> <DeleteIcon fontSize="small"/> </IconButton>
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