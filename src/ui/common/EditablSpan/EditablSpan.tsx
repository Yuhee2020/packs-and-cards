import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import {Tooltip} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const SuperEditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField size={"small"} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <Tooltip title={"Double click to edit"}><span onDoubleClick={activateEditMode}>{props.value}</span></Tooltip>
});

export default SuperEditableSpan;