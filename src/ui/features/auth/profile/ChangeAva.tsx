import React, {ChangeEvent} from 'react';
import {IconButton} from "@mui/material";
import {useAppDispatch} from "../../../../utils/hooks";
import {setAppErrorAC} from "../../../../store/reducers/app-reducer";
import {changeAvatarAC} from "../../../../store/reducers/profile-reducer";
import s from './Profile.module.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {convertFileToBase64} from "../../../../utils/base64Converter";


export const ChangeAva = () => {
    const dispatch = useAppDispatch();
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 300000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeAvatarAC(file64))
                    console.log('file64: ', file64)
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }
    return (
        <div className={s.bottomRight}>
            <IconButton sx={{padding:"0"}} component="label">
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    value={""}
                    onChange={uploadHandler}/>
                <CameraAltIcon  fontSize={'large'}/>
            </IconButton>
        </div>
    );
};


