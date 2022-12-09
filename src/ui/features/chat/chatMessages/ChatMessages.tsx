import React, {useRef} from 'react';
import {useAppSelector} from "../../../../utils/hooks";
import s from './ChatMessage.module.css'
import {ChatMessage} from "../chatMessage/ChatMessage";
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import {Options} from "overlayscrollbars";
import {getScroll} from "../../../../utils/getScroll";


type PropsType = {
    clearUnreadMessages: (value: number) => void;
    scrollDown: boolean;
    setScrollDown: (value: boolean) => void;
};
export const ChatMessages: React.FC<PropsType> = ({
                                                      clearUnreadMessages,
                                                      scrollDown,
                                                      setScrollDown,
                                                  }) => {
    const messages = useAppSelector(state => state.chat.messages);
    const chatMessagesRef = useRef<OverlayScrollbarsComponent>(null);

    const onHostSizeChanged = (): void => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
        }
    };

    const onContentSizeChanged = (): void => {
        if (chatMessagesRef.current) {
            const { overflowAmount, scrollPosition } = getScroll(chatMessagesRef.current);

            if (overflowAmount - scrollPosition > 100) {
                if (scrollDown && chatMessagesRef.current) {
                    chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
                    setScrollDown(false);
                } else chatMessagesRef.current.osInstance()?.scroll({ y: scrollPosition });
            } else {
                chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
            }
        }
    };

    const onScrollStop = (): void => {
        if (chatMessagesRef.current) {
            const { overflowAmount, scrollPosition } = getScroll(chatMessagesRef.current);

            if (overflowAmount - scrollPosition < 100) {
                clearUnreadMessages(0);
            }
        }
    };

    const options: Options = {
        scrollbars: {
            clickScrolling: true,
            autoHide: 'leave',
            autoHideDelay: 0,
        },
        callbacks: {
            onContentSizeChanged,
            onScrollStop,
            onHostSizeChanged,
        },
    };

    return (
        <OverlayScrollbarsComponent
            ref={chatMessagesRef}
            className={s.messages}
            options={options}
        >
            {messages.map(message => (
                <ChatMessage message={message} key={message._id} />
            ))}
        </OverlayScrollbarsComponent>
    );
};