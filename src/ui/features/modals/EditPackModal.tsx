import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../utils/hooks";
import {updatePackTC} from "../../../bll/reducers/packs-reducer";
import {BasicModal} from "./BasicModal";
import {Button, Checkbox, FormControlLabel, IconButton, Stack, TextField} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

type PropsType = {
    id: string
    name: string
    private_: boolean
}
export const EditPackModal = ({id, name, private_}: PropsType) => {

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [value, setValue] = useState<string>(name)
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const dispatch = useAppDispatch()

    const [checked, setChecked] = useState<boolean>(private_)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
    };

    const handleUpdate = () => {
        dispatch(updatePackTC({_id: id, name: value, private: checked}))
        handleClose()
    }

    const handleCancel = () => {
        handleClose()
        setValue(name)
        setChecked(private_)
    }

    return (
        <BasicModal title={'Edit pack'}
                    button={<IconButton>
                        <DriveFileRenameOutlineIcon
                            fontSize="small"/>
                    </IconButton>}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}>

            <div>
                <TextField
                    fullWidth
                    required
                    id="standard-required"
                    label="Name Pack"
                    variant="standard"
                    value={value}
                    onChange={onChangeHandler}
                    margin={'normal'}
                />
                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Private pack" />
                <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-around'}>
                    <Button  variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button  variant="contained" onClick={handleUpdate}>Save</Button>
                </Stack>
            </div>
        </BasicModal>
    )
}