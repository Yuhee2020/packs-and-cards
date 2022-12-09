import React from 'react';
import Avatar from '@mui/material/Avatar/Avatar';
import {MessageType} from "../../../../api/chat.api/chatTypes";
import {useAppSelector} from "../../../../utils/hooks";
import s from './ChatMessage.module.css'


type PropsType = {
    message: MessageType;
};

export const ChatMessage: React.FC<PropsType> = ({ message }) => {
    const myId = useAppSelector(state => state.profile._id);
    const userId = message.user._id;
    const { name } = message.user;
    const isMyMessage = myId === userId;

    return (
        <div className={isMyMessage ? s.myMessageBlock : s.messageBlock}>
            {!isMyMessage &&
                (name === 'anonymous' || name === 'neko-admin' ? (
                    <Avatar alt="avatar" />
                ) :
                        <Avatar alt="avatar" src={message.user.name} />
                )}

            <div className={s.message}>
                {!isMyMessage && <div className={s.name}>{name}</div>}
                <div className={s.text}>{message.message}</div>
            </div>
        </div>
    );
};