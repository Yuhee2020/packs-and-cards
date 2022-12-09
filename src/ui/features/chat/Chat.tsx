import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {createConnection, disconnect} from "../../../store/reducers/chat-reducer";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import s from './Chat.module.css'
import {ChatModal} from "./chatModal/ChatModal";
import {Badge, IconButton} from "@mui/material";


// export const Chat = () => {
//     const dispatch=useAppDispatch()
//     const id = useAppSelector(state => state.profile._id)
//     const name = useAppSelector(state => state.profile.email)
//     const ava = useAppSelector(state => state.profile.avatar)
//     const messages = useAppSelector(state => state.chat.messages)
//
//     useEffect(() => {
//         dispatch(createConnection(id,name,null))
//         // chatAPI.createConnection(id, name, null)
//         // chatAPI.subscribe((messages)=>{
//         //     console.log(messages)},(message)=>{
//         //     console.log(message)  })
//         // const socket = socketIo("https://neko-back.herokuapp.com/",{
//         //     query: { _id:id, name, avatar: null }
//         // });
//         // socket?.emit('init');
//         // socket?.on('init-messages-published',(messages: any) =>{
//         //     console.log(messages)
//         // } )
//         // socket?.on('new-message-sent',(message: any) => {
//         //     console.log(message);
//         // })
// // chatAPI.createConnection(id,name,ava)
// //         return chatAPI.destroyConnection()
//         return ()=>dispatch(disconnect())
//     }, [])
//
//     return (
//         <div>
//             {messages.map(mess=>
//                 <div>{mess.message}</div>)}
//             <button onClick={() => {
//                 dispatch(sendMessage("HI"))
//             }}>+++
//             </button>
//         </div>
//     );
// };

export const Chat = ()=> {
    const dispatch = useAppDispatch();
    const [viewChat, setViewChat] = useState(false);
    const [first, setFirst] = useState(true);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const avatar = useAppSelector(state => state.profile.avatar);
    const messages = useAppSelector(state =>state.chat.messages);
    const name = useAppSelector(state =>state.profile.name);
    const userId = useAppSelector(state =>state.profile._id);

    const closeChatModal = ()=> {
        setViewChat(false);
    };

    const openChatModal = ()=> {
        setViewChat(true);
        setUnreadMessages(0);
    };

    useEffect(() => {
        dispatch(createConnection(userId, name, null));
        return () => {
            dispatch(disconnect());
        };
    }, [dispatch, userId, name, avatar]);

    useEffect(() => {
        if (first) {
            setUnreadMessages(unreadMessages - 1);
            setFirst(false);
        }
        if (messages.length) {
            setUnreadMessages(unreadMessages + 1);
        }
    }, [messages]);

    return (
        <div className={s.main}>
            {viewChat ? (
                <ChatModal
                    closeChatModal={closeChatModal}
                    clearUnreadMessages={setUnreadMessages}
                />
            ) : (
                <IconButton size="large" onClick={openChatModal}>
                    <Badge badgeContent={unreadMessages} color="primary">
                        <QuestionAnswerIcon fontSize="inherit" />
                    </Badge>
                </IconButton>
            )}
        </div>
    );
};