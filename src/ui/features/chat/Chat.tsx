import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {createConnection, disconnect, setChatViewedAC} from "../../../store/reducers/chat-reducer";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import s from './Chat.module.css'
import {ChatModal} from "./chatModal/ChatModal";
import {Badge, IconButton} from "@mui/material";


export const Chat = () => {
    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.profile.name);
    const userId = useAppSelector(state => state.profile._id);
    const newMessage = useAppSelector(state => state.chat.message);
    const chatViewed =useAppSelector(state => state.chat.chatViewed);


    const badgeContent = newMessage? "!" : null

    const closeChatModal = () => {
        dispatch(setChatViewedAC(false));
    };

    const openChatModal = () => {
        dispatch(setChatViewedAC(true));
    };

    useEffect(() => {
        dispatch(createConnection(userId, name, null));
        return () => {
            dispatch(disconnect());
        };
    }, [dispatch, userId, name]);


    return (
        <div className={s.main}>
            {chatViewed
                ? <ChatModal closeChatModal={closeChatModal}/>
                : <IconButton size="large" onClick={openChatModal}>
                    <Badge color={"primary"} badgeContent={badgeContent}>
                    <QuestionAnswerIcon fontSize="inherit"/>
                    </Badge>
                    </IconButton>
            }
        </div>
    );
};