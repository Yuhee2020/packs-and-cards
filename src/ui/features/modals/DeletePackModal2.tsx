import React, {useState} from 'react';
import {BasicModal2} from "./BasicModal2";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {CardType} from "../../../dal/cards-api";
import {deleteCardTC} from "../../../bll/reducers/cards-reducer";
import {useAppDispatch} from "../../../utils/hooks";
import {PackType} from "../../../dal/packs-api";
import {deletePackTC} from "../../../bll/reducers/packs-reducer";


type PropsType = {
    pack: PackType
}

export const DeleteCardModal2 = ({pack}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => setOpen(!open);
    const deleteCardHandler = () => {
        dispatch(deletePackTC(pack._id))
        handleOpenClose()
    }

    return (
        <div>
            <IconButton onClick={handleOpenClose}><DeleteOutlineIcon
                fontSize={"small"}/></IconButton>
            <BasicModal2 title={'Delete Card'} open={open} handleOpenClose={handleOpenClose}>
                <Stack paddingTop={"10px"} direction={"column"} spacing={5} justifyContent={"space-evenly"}>
                    <div>Do you really want remove <b>{pack.name}</b>?
                        All cards will be deleted.</div>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Button variant={'contained'} color={'primary'} onClick={handleOpenClose}>Cancel</Button>
                        <Button variant={'contained'} color={'error'} onClick={deleteCardHandler}>Delete</Button>
                    </Stack>
                </Stack>
            </BasicModal2>
        </div>
    );
};
