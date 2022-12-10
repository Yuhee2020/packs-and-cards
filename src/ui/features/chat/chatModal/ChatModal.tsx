import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';
import s from './ChatModal.module.css'
import {useAppDispatch} from "../../../../utils/hooks";
import {ChatMessages} from "../chatMessages/ChatMessages";
import {sendMessage} from "../../../../store/reducers/chat-reducer";


type PropsType = {
    closeChatModal: () => void;
};

export const ChatModal= ({closeChatModal}:PropsType) => {

    const dispatch = useAppDispatch();
    const [messageValue, setMessageValue] = useState('');

    const onChangeMessageValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setMessageValue(e.currentTarget.value);
    };

    const sendNewMessage = ()=> {
        if (messageValue.trim().length) {
            dispatch(sendMessage(messageValue));
        }
        setMessageValue('');
    };

    const onKeyUpEnter = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        if (e.key === 'Enter' && messageValue) sendNewMessage();
    };

    return (
        <Paper elevation={3} className={s.paper}>
            <div className={s.header}>
                <div className={s.title}>Chat</div>
                <IconButton onClick={closeChatModal} size="small">
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </div>
            <ChatMessages/>

            <InputBase
                className={s.input}
                placeholder="Write a message..."
                value={messageValue}
                onKeyUp={onKeyUpEnter}
                onChange={onChangeMessageValue}
                endAdornment={
                    <IconButton onClick={sendNewMessage} disabled={!messageValue}>
                        <SendIcon fontSize="inherit" color={messageValue ? 'primary' : undefined} />
                    </IconButton>
                }
            />
        </Paper>
    );
};