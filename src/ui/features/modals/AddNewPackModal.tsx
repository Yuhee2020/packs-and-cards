import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import {createPackTC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch} from "../../../utils/hooks";

export const AddNewPackModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState<string>('Name Pack')
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const dispatch = useAppDispatch();

    const [checked, setChecked] = React.useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    };

    const handleSave = async () => {
        const prom = await dispatch(createPackTC({name: value, private_: checked}))
        handleClose();
        setValue('Name Pack')
    }

    return (

        <BasicModal title={'Add new pack'}
                    button={<Button variant="contained">Add New Pack</Button>}
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
                    <Button  variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button  variant="contained" onClick={handleSave}>Save</Button>
                </Stack>
            </div>
        </BasicModal>
    )
}