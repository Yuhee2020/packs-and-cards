import {
    setAppErrorAC,
    setAppStatusAC,
} from '../../../m2-bll/reducers/app-reducer'
import {AppDispatch} from "../../../m2-bll/store";

/*export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}*/


export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
