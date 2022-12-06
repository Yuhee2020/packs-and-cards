import {AxiosResponse} from 'axios';
import { instance } from '../instance';
import {
    LoginDataType,
    LoginResponseType, PasswordResponseType,
    RecoveryPasswordDataType,
    RegisterDataType,
    RegisterResponseType, SetNewPasswordType
} from "./authTypes";




export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<{},AxiosResponse<{info:string}>>('/auth/me')
    },
    me() {
        return instance.post<{},AxiosResponse<LoginResponseType>>('/auth/me')
    },
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>
        ('auth/register', data)
    },
    passwordRecovery(data:RecoveryPasswordDataType){
        return instance.post<RecoveryPasswordDataType, AxiosResponse<PasswordResponseType>>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordType){
        return instance.post<SetNewPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', data)
    },
    changeProfile(name: string, avatar: string) {
        return instance.put('auth/me', {name, avatar})
    }

}


