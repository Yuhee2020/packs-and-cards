import {AppDispatch} from "../store";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {authAPI} from "../../api/auth-api/auth-api";
import {LoginResponseType} from "../../api/auth-api/authTypes";


//state
const initialState = {
    _id: "",
    name:"",
    avatar: "",
    email: ""
}
type initialStateType=typeof initialState

//reducer
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionsType): initialStateType => {
    switch (action.type) {
        case 'profile/SET-PROFILE': {
            return {
                ...state,
                _id: action.res._id,
                name: action.res.name,
                email: action.res.email,
                avatar: action.res.avatar ? action.res.avatar : 'https://i.pinimg.com/originals/ea/09/10/ea0910307bcc7fea70790f85c0598aa3.jpg'
            };
        }
        case 'profile/CHANGE-NAME': {
            return {...state, name: action.name};
        }
        case 'profile/CHANGE-AVATAR': {
            return {...state, avatar: action.avatar};
        }
        default:
            return state;
    }
}


//actions
export const setProfileAC = (res: LoginResponseType) => {
    return {
        type: 'profile/SET-PROFILE',
        res
    } as const
};
export const changeNameAC = (name: string) => {
    return {
        type: 'profile/CHANGE-NAME',
        name,
    } as const
};

export const changeAvatarAC = (avatar: string) => {
    return {
        type: 'profile/CHANGE-AVATAR',
        avatar,
    } as const
};


//thunks
export const changeProfileInfoTC = (name: string, avatar: string) =>
    (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.changeProfile(name, avatar)
            .then(res => {
                dispatch(changeNameAC(res.data.updatedUser.name));
            })
            .catch((err: AxiosError<{ error: string }>) => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    };


//types
export type ProfileActionsType = ReturnType<typeof changeNameAC | typeof setProfileAC | typeof changeAvatarAC>;
