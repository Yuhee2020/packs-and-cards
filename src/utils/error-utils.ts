import {
    setAppErrorAC,
    setAppStatusAC,
} from '../bll/reducers/app-reducer'
import {AppDispatch} from "../bll/store";


export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
