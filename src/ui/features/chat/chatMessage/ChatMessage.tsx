import React, {useEffect, useRef} from 'react';
import Avatar from '@mui/material/Avatar/Avatar';
import {MessageType} from "../../../../api/chat.api/chatTypes";
import {useAppSelector} from "../../../../utils/hooks";
import s from './ChatMessage.module.css'


type PropsType = {
    message: MessageType;
};

export const ChatMessage= ({message}:PropsType) => {

    const myId = useAppSelector(state => state.profile._id);
    const userId = message.user._id;
    const {name} = message.user;
    const isMyMessage = myId === userId;

    const messageRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
        messageRef.current?.scrollIntoView({behavior:"smooth"})
    })



    return (
        <div className={isMyMessage ? s.myMessageBlock : s.messageBlock}>
            {!isMyMessage &&
                <Avatar alt="avatar" src={message.user._id}/>
            }
            <div className={s.message} ref={messageRef}>
                {!isMyMessage && <div className={s.name}>{name}</div>}
                <div className={s.text}>{message.message}</div>
            </div>
        </div>
    );
};