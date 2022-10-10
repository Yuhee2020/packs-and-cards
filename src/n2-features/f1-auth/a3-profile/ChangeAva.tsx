import React, {ChangeEvent} from 'react';
import {IconButton} from "@mui/material";
import {useAppDispatch} from "../../../n1-main/m1-ui/hooks";
import {setAppErrorAC} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {changeAvatarAC} from "../../../n1-main/m2-bll/reducers/profile-reducer";
import s from './Profile.module.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


export const ChangeAva = () => {
    const dispatch = useAppDispatch();
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debugger

        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 210000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeAvatarAC(file64))
                    console.log('file64: ', file64)
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }
    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
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


