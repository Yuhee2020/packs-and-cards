import {AppRootStateType, AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";
import {GetUsersResponseType, usersAPI, UserType} from "../../api/users-api";

const initialState = {
    users: [] as UserType[],
    page: 1,
    pageCount: 5,
    userName: "",
    usersTotalCount: 0
}

export const usersReducer = (state: UsersStateType = initialState, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case 'users/SET-USERS': {
            return {...state, users: action.users.users, usersTotalCount: action.users.usersTotalCount}
        }
        case 'users/SET-PAGE': {
            return {...state, page: action.page}
        }
        case 'users/SET-USERS-COUNT': {
            return {...state, pageCount: action.usersCount}
        }
        case 'users/SET-USER-NAME': {
            return {...state, userName: action.userName}
        }
        default:
            return state;
    }
}

export const setUsersAC = (users: GetUsersResponseType) => {
    return {
        type: 'users/SET-USERS',
        users
    } as const
}

export const setPageAC = (page: number) => {
    return {
        type: 'users/SET-PAGE',
        page
    } as const
}

export const setUsersCountAC = (usersCount:number) => {
    return {
        type: 'users/SET-USERS-COUNT',
        usersCount
    } as const
}

export const setUserNameAC = (userName:string) => {
    return {
        type: 'users/SET-USER-NAME',
        userName
    } as const
}


export const getUsersTC = (): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    const {page, pageCount, userName} = getState().users
    usersAPI.getUsers({page, pageCount, userName})
        .then(res => {
            dispatch(setUsersAC(res.data))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
}


type UsersStateType = typeof initialState;
type UsersActionsType = ReturnType<typeof setUsersAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setUsersCountAC>
    | ReturnType<typeof setUserNameAC>


