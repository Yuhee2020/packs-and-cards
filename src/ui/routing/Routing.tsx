import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../features/auth/profile/Profile";
import Login from "../features/auth/login/Login";
import Registration from "../features/auth/registration/Registration";
import PasswordRecovery from "../features/password/a2-recovery/PasswordRecovery";
import NewPassword from "../features/password/a1-new/NewPassword";
import PasswordIsRecovery from "../features/password/a2-recovery/PasswordIsRecovered";
import PasswordIsChanged from "../features/password/a1-new/PasswordIsChanged";
import Error404 from "../common/Error404/404";
import Packs from "../features/packs/Packs";
import {Cards} from "../features/cards/Cards";
import LearnPage from "../features/learn/LearnPage";
import {Users} from "../features/users/Users";
import {User} from "../features/users/user/User";


export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTRATION = '/registration'

export const PASSWORD_RECOVERY = '/password-recovery'
export const PASSWORD_RECOVERED = '/password-recovered'

export const NEW_PASSWORD = '/new-password/:token'
export const PASSWORD_CHANGED = '/password-changed'

export const PROFILE = '/profile'
export const PACKS = '/packs'
export const CARDS = '/cards/:packId'
export const LEARN = '/learn/:packId'

export const ERROR_404 = '/404'
export const USER= '/users/:userId'
export const USERS= '/users/'

const  Routing = () => {
    return (
        <div>
            <Routes>
                <Route path={ROOT} element={<Login/>}/>
                <Route path={PROFILE} element={<Profile/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>
                <Route path={PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PASSWORD_RECOVERED} element={<PasswordIsRecovery/>}/>
                <Route path={NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PASSWORD_CHANGED} element={<PasswordIsChanged/>}/>
                <Route path={PACKS} element={<Packs/>}/>
                <Route path={CARDS} element={<Cards/>}/>
                <Route path={USER} element={<User/>}/>
                <Route path={USERS} element={<Users/>}/>
                <Route path={LEARN} element={<LearnPage/>}/>
                <Route path={ERROR_404} element={<Error404/>}/>
                <Route path="*" element={<Navigate to={"/404"}/>}/>

            </Routes>
        </div>
    )
}

export default Routing;