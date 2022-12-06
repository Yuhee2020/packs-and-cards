import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import {createPackTC} from "../../../../store/reducers/packs-reducer";
import {useAppDispatch} from "../../../../utils/hooks";
import {BasicModal} from "../../../common/modals/BasicModal";
import {setAppErrorAC} from "../../../../store/reducers/app-reducer";
import {convertFileToBase64} from "../../../../utils/base64Converter";
import s from "../../../common/modals/modal.module.css"

export const AddNewPackModal = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('')
    const [checked, setChecked] = React.useState(false);
    const [cover, setCover] = React.useState("");
    const handleOpenClose = () => {
        setOpen(!open)
        setValue("")
        setCover("")
    };
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    };

    const handleSave=()=>{
        dispatch(createPackTC({name: value, private_: checked, deckCover:cover}))
        handleOpenClose();
        setValue('')
        setCover("")
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 200000) {
                convertFileToBase64(file, (file64: string) => {
                    setCover(file64)
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }

    return (
        <div>
            <Button onClick={handleOpenClose} variant="contained">Add New Pack</Button>
            <BasicModal title={'Add new pack'}
                        open={open}
                        handleOpenClose={handleOpenClose}>

                {cover
                    ?<img className={s.cover} src={cover} alt={"cover"}/>
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