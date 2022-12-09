import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import s from './ChatModal.module.css'
import {useAppDispatch} from "../../../../utils/hooks";
import {ChatMessages} from "../chatMessages/ChatMessages";
import {sendMessage} from "../../../../store/reducers/chat-reducer";


type PropsType = {
    closeChatModal: () => void;
    clearUnreadMessages: (value: number) => void;
};

export const ChatModal= ({closeChatModal,clearUnreadMessages}:PropsType) => {
    const dispatch = useAppDispatch();
    const [messageValue, setMessageValue] = useState('');
    const [scrollDown, setScrollDown] = useState(false);

    const onChangeMessageValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setMessageValue(e.currentTarget.value);
    };

    const sendNewMessage = ()=> {
        if (messageValue.trim().length) {
            dispatch(sendMessage(messageValue));
            setScrollDown(true);
        }
        setMessageValue('');
    };

    const onKeyUpEnter = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        if (e.key === 'Enter' && messageValue) sendNewMessage();
    };

    return (
        <Paper elevation={3} className={s.paper}>
            <div className={s.header}>
                <Typography className={s.title}>Chat</Typography>
                <IconButton onClick={closeChatModal} size="small">
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </div>

            <ChatMessages
                clearUnreadMessages={clearUnreadMessages}
                scrollDown={scrollDown}
                setScrollDown={setScrollDown}
            />

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