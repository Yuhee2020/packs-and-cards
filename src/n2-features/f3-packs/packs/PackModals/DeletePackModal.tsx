import React, {useState} from 'react';
import {useAppDispatch} from "../../../../n1-main/m1-ui/hooks";
import {deletePackTC} from "../../../../n1-main/m2-bll/reducers/packs-reducer";
import {BasicModal} from "../../../../n1-main/m1-ui/common/BasicModal/BasicModal";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";

type PropsType = {
    id: string
    name: string
}
export const DeletePackModal = ({id, name}: PropsType) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(deletePackTC(id))
        handleClose();
    }

    return (
        <BasicModal title={'Edit pack'}
                    button={<IconButton>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
        }
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}>
            <div>
                <Typography id="modal-modal-title" variant="h6" component="h6"
                            margin={'8px'}>
                    Do you really want to remove <b>{name}</b>?
                    All cards will be deleted.
                </Typography>
                <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-around'}>
                    <Button  variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button  style={{background: '#FF3636'}} variant="contained" onClick={handleDelete}>Delete</Button>
                </Stack>
            </div>
        </BasicModal>
    )
}