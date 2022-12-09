import {AppThunk} from "../store";
import {setAppErrorAC} from "./app-reducer";
import {MessageType} from "../../api/chat.api/chatTypes";
import {chatAPI} from "../../api/chat.api/chat-api";


const initialState = {
    message: "",
    messages: [] as MessageType[]
}

//reducer
export const chatReducer = (state: ChatStateType = initialState, action: ChatActionsType): ChatStateType => {
    switch (action.type) {
        case 'chat/SetMessages': {
            return {...state, messages: action.messages}
        }
        case "chat/SetNewMessage": {
            return {...state, messages: [...state.messages, action.message]}
        }
        default:
            return state;
    }
}

//action creators
export const setMessagesAC = (messages: MessageType[]) => {
    return {
        type: 'chat/SetMessages',
        messages
    } as const
}

export const setNewMessageAC = (message: MessageType) => {
    return {
        type: 'chat/SetNewMessage',
        message
    } as const
}


//thunks
export const createConnection = (id: string, name: string, avatar: string | null): AppThunk => (dispatch) => {
    try {
        chatAPI.createConnection(id, name, avatar)
        chatAPI.subscribe(
            (messages) => dispatch(setMessagesAC(messages)),
            (message) => dispatch(setNewMessageAC(message)))
    } catch (err: any) {
        dispatch(setAppErrorAC(err))
    }
}

export const sendMessage = (message: string): AppThunk => (dispatch) => {
    try {
        chatAPI.sendMessage(message)
    } catch (err: any) {
        dispatch(setAppErrorAC(err))
    }
}

export const disconnect = (): AppThunk => (dispatch) => {
    try {
        chatAPI.disconnect()
    } catch (err: any) {
        dispatch(setAppErrorAC(err))
    }
}

//types
type ChatStateType = typeof initialState;
type ChatActionsType = ReturnType<typeof setMessagesAC>
    | ReturnType<typeof setNewMessageAC>



