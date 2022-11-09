import {
    setAppErrorAC,
    setAppStatusAC,
} from '../store/reducers/app-reducer'
import {AppDispatch} from "../store/store";


export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
