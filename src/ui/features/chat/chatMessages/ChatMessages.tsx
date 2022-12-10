import React from 'react';
import {useAppSelector} from "../../../../utils/hooks";
import {ChatMessage} from "../chatMessage/ChatMessage";
import s from "./ChatMessages.module.css"
import 'overlayscrollbars/overlayscrollbars.css'


export const ChatMessages= () => {

    const messages = useAppSelector(state => state.chat.messages)

    return (
        <div className={s.messages}>
            {messages.map(message => (
                <ChatMessage message={message} key={message._id} />
            ))}
        </div>
    );
};