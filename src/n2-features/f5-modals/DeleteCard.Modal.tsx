import React, {useState} from 'react';
import {BasicModal2} from "./BasicModal2";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {CardType} from "../../n1-main/m3-dal/api/cards-api";
import {deleteCardTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {useAppDispatch} from "../../n1-main/m1-ui/hooks";


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
            <BasicModal2 title={'Delete Card'} open={open} handleOpenClose={handleOpenClose}>
                <Stack paddingTop={"10px"} direction={"column"} spacing={5} justifyContent={"space-evenly"}>
                    <div>Do you really want remove this card? Question "{card.question}" will be deleted</div>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Button variant={'contained'} color={'primary'} onClick={handleOpenClose}>Cancel</Button>
                        <Button variant={'contained'} color={'error'} onClick={deleteCardHandler}>Delete</Button>
                    </Stack>
                </Stack>
            </BasicModal2>
        </div>
    );
};
