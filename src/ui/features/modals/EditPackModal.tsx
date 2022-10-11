import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../utils/hooks";
import {updatePackTC} from "../../../bll/reducers/packs-reducer";
import {Button, Checkbox, FormControlLabel, IconButton, Stack, TextField} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {BasicModal} from "./BasicModal";
import {PackType} from "../../../dal/packs-api";
import s from "./modal.module.css";
import {convertFileToBase64} from "../../../utils/base64Converter";
import {setAppErrorAC} from "../../../bll/reducers/app-reducer";

type PropsType = {
    pack: PackType
}
export const EditPackModal = ({pack}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>(pack.name)
    const [checked, setChecked] = useState<boolean>(pack.private)
    const [cover, setCover] = React.useState("");
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
        dispatch(updatePackTC({_id: pack._id, name: value, private: checked, deckCover: cover}))
        handleOpenClose()
        setCover("")
    }
    const handleCancel = () => {
        handleOpenClose()
        setValue(pack.name)
        setChecked(pack.private)
        setCover("")
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 200000) {
                convertFileToBase64(file, (file64: string) => {
                    setCover(file64)
                    console.log('file64: ', file64)
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }

    return (
        <div>
            <IconButton onClick={handleOpenClose}><DriveFileRenameOutlineIcon fontSize="small"/></IconButton>
            <BasicModal title={'Edit pack'}
                        open={open}
                        handleOpenClose={handleOpenClose}>
                {cover && <img className={s.cover} src={cover} alt={"cover"}/>}
                {pack.deckCover && !cover
                    ? <Button fullWidth variant={"contained"} component="label">
                            Load new cover
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                value={""}
                                onChange={uploadHandler}/>
                        </Button>

                    :<Button fullWidth variant={"contained"} component="label">
                        Download cover
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            value={""}
                            onChange={uploadHandler}/>
                    </Button>}
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