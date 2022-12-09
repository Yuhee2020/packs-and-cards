import socketIo from 'socket.io-client';
import {MessageType} from "./chatTypes";
import {disconnect} from "../../store/reducers/chat-reducer";

export const chatAPI = {
    socket: null as null | any,
    createConnection(_id: string, name: string, avatar: string | null) {
        this.socket = socketIo('https://neko-back.herokuapp.com/', {
            query: { _id, name, avatar },
        });

        this.socket?.emit('init');
    },

    subscribe(
        initMessagesHandle: (messages: Array<MessageType>) => void,
        newMessageSandHandle: (message: MessageType) => void,
    ) {
        this.socket?.on('init-messages-published', initMessagesHandle);
        this.socket?.on('new-message-sent', newMessageSandHandle);
    },

    sendMessage(messageText: string) {
        this.socket?.emit('client-message-sent', messageText);
    },

    disconnect() {
        this.socket.disconnect();
        this.socket = null;
    },
}


