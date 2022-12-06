import {AppRootStateType, AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";
import {usersAPI,} from "../../api/users-api/users-api";
import {GetUsersResponseType, UserType} from "../../api/users-api/usersTypes";


const initialState = {
    users: [] as UserType[],
    page: 1,
    pageCount: 5,
    userName: "",
    usersTotalCount: 0,
    user:{} as UserType
}

//reducer
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
        case 'users/SET-USER': {
            return {...state, user: action.user}
        }
        default:
            return state;
    }
}

//action creators
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

export const setUsersCountAC = (usersCount: number) => {
    return {
        type: 'users/SET-USERS-COUNT',
        usersCount
    } as const
}

export const setUserNameAC = (userName: string) => {
    return {
        type: 'users/SET-USER-NAME',
        userName
    } as const
}

export const setUserAC = (user: UserType) => {
    return {
        type: 'users/SET-USER',
        user
    } as const
}

//thunks
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

export const getUserTC = (userId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    usersAPI.getUser(userId)
        .then(res => {
            dispatch(setUserAC(res.data.user))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
}

//types
type UsersStateType = typeof initialState;
type UsersActionsType = ReturnType<typeof setUsersAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setUsersCountAC>
    | ReturnType<typeof setUserNameAC>
    | ReturnType<typeof setUserAC>


