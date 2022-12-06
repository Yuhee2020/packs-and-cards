import {instance} from "../instance";
import {GetUserResponseType, GetUsersParamsType, GetUsersResponseType} from "./usersTypes";



export const usersAPI = {

    getUsers(params: GetUsersParamsType) {
        return instance.get<GetUsersResponseType>("social/users", {params})
    },
	getUser(userID:string) {
		return instance.get<GetUserResponseType>(`social/user?id=${userID}`)
	},
}


