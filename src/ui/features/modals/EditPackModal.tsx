import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../utils/hooks";
import {updatePackTC} from "../../../bll/reducers/packs-reducer";
import {Button, Checkbox, FormControlLabel, IconButton, Stack, TextField} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {BasicModal} from "./BasicModal";
import {PackType} from "../../../dal/packs-api";

type PropsType = {
    pack:PackType
}
export const EditPackModal = ({pack}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>(pack.name)
    const [checked, setChecked] = useState<boolean>(pack.private)
    const handleOpenClose = () => {
        setOpen(!open)
    };
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
    };
    const handleUpdate = () => {
        dispatch(updatePackTC({_id: pack._id, name: value, private: checked}))
        handleOpenClose()
    }
    const handleCancel = () => {
        handleOpenClose()
        setValue(pack.name)
        setChecked(pack.private)
    }

    return (
        <div>
            <IconButton onClick={handleOpenClose}><DriveFileRenameOutlineIcon fontSize="small"/></IconButton>
            <BasicModal title={'Edit pack'}
                        open={open}
                        handleOpenClose={handleOpenClose}>
                <div>
                    <TextField
                        fullWidth
                        id="standard-required"
                        label="Pack name"
                        variant="standard"
                        value={value}
                        onChange={onChangeHandler}
                        margin={'normal'}
                    />
                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>}
                                      label="Private pack"/>
                    <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                        <Button variant={'contained'} style={{width: "100px"}} color={'inherit'}
                                onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} variant={'contained'} style={{width: "100px"}} color={'primary'}>
                            Save
                        </Button>
                    </Stack>
                </div>
            </BasicModal>
        </div>
    )
}