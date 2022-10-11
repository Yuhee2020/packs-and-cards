import React, {useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {CardType} from "../../../dal/cards-api";
import {deleteCardTC} from "../../../bll/reducers/cards-reducer";
import {useAppDispatch} from "../../../utils/hooks";


type PropsType = {
    card: CardType
}

export const DeleteCardModal = ({card}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => setOpen(!open);
    const deleteCardHandler = () => {
        dispatch(deleteCardTC(card._id))
        handleOpenClose()
    }

    return (
        <div>
            <IconButton onClick={handleOpenClose}><DeleteOutlineIcon
                fontSize={"small"}/></IconButton>
            <BasicModal title={'Delete Card'} open={open} handleOpenClose={handleOpenClose}>
                <Stack paddingTop={"10px"} direction={"column"} spacing={5} justifyContent={"space-evenly"}>
                    <div>Do you really want remove this card? Question <b>"{card.question}"</b> will be deleted</div>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Button variant={'contained'} color={'primary'} onClick={handleOpenClose}>Cancel</Button>
                        <Button variant={'contained'} color={'error'} onClick={deleteCardHandler}>Delete</Button>
                    </Stack>
                </Stack>
            </BasicModal>
        </div>
    );
};
