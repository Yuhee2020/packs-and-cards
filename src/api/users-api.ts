import {instance} from "./autumn-api";

export const usersAPI = {

    getUsers(params: GetUsersParamsType) {
        return instance.get<GetUsersResponseType>("social/users", {params})
    }
}

export type GetUsersParamsType={
    userName?:string
    min?:number
    max?:number
    sortUsers?:number
    page?:number
    pageCount?:number
}

export type GetUsersResponseType = {
	users: UserType[];
	page: number;
	pageCount: number;
	usersTotalCount: number;
	minPublicCardPacksCount: number;
	maxPublicCardPacksCount: number;
	token: string;
	tokenDeathTime: number;
}
export type UserType = {
	avatar:string;
	_id: string;
	email: string;
	isAdmin: boolean;
	name: string;
	verified: boolean;
	publicCardPacksCount: number;
	created: string;
	updated: string;
}