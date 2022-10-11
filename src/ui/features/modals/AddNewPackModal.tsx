import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import {createPackTC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch} from "../../../utils/hooks";
import {BasicModal} from "./BasicModal";

export const AddNewPackModal = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('')
    const [checked, setChecked] = React.useState<boolean>(false);
    const handleOpenClose = () => {
        setOpen(!open)
        setValue("")
    };
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    };

    const handleSave=()=>{
        dispatch(createPackTC({name: value, private_: checked}))
        handleOpenClose();
        setValue('')
    }

    return (
        <div>
            <Button onClick={handleOpenClose} variant="contained">Add New Pack</Button>
            <BasicModal title={'Add new pack'}
                        open={open}
                        handleOpenClose={handleOpenClose}>

                <div>
                    <TextField
                        fullWidth
                        label="Enter Pack name"
                        variant="standard"
                        value={value}
                        onChange={onChangeHandler}
                        margin={'normal'}
                    />
                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>}
                                      label="Private pack"/>
                    <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-between'}>
                        <Button variant={'contained'} style={{width: "100px"}} color={'inherit'}
                                onClick={handleOpenClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant={'contained'} style={{width: "100px"}} color={'primary'}>
                            Save
                        </Button>
                    </Stack>
                </div>
            </BasicModal>
        </div>
    )
}