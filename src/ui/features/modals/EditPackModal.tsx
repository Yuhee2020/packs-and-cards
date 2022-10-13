import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../utils/hooks";
import {changeCoverAC, updatePackTC} from "../../../bll/reducers/packs-reducer";
import {Button, Checkbox, FormControlLabel, IconButton, Stack, TextField} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {BasicModal} from "./BasicModal";
import {PackType} from "../../../dal/packs-api";
import s from "./modal.module.css";
import {convertFileToBase64} from "../../../utils/base64Converter";
import {setAppErrorAC} from "../../../bll/reducers/app-reducer";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

type PropsType = {
    pack: PackType
    text?:boolean
}
export const EditPackModal = ({pack,text}: PropsType) => {

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
        dispatch(updatePackTC({_id: pack._id, name: value, private: checked, deckCover: pack.deckCover}))
        handleOpenClose()
    }
    const handleCancel = () => {
        handleOpenClose()
        setValue(pack.name)
        setChecked(pack.private)
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 200000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeCoverAC(pack._id,file64))
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }

    return (
        <div>
            {text? <MenuItem onClick={handleOpenClose}>
                <ListItemIcon>
                    <BorderColorIcon fontSize="small"/>
                </ListItemIcon>
                Edit
            </MenuItem>
                :<IconButton onClick={handleOpenClose}><DriveFileRenameOutlineIcon fontSize="small"/></IconButton>
                }
            <BasicModal title={'Edit pack'}
                        open={open}
                        handleOpenClose={handleOpenClose}>
                <Stack direction={"row"} justifyContent={"center"} spacing={2}><img className={s.cover2} src={pack.deckCover} alt={"cover"}/>
                    <Button component="label">
                        Change cover
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            value={""}
                            onChange={uploadHandler}/>
                    </Button></Stack>

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