import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../../../n2-features/f1-auth/a3-profile/Profile";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-registration/Registration";
import PasswordRecovery from "../../../n2-features/f2-password/a2-recovery/PasswordRecovery";
import NewPassword from "../../../n2-features/f2-password/a1-new/NewPassword";
import PasswordIsRecovery from "../../../n2-features/f2-password/a2-recovery/PasswordIsRecovered";
import PasswordIsChanged from "../../../n2-features/f2-password/a1-new/PasswordIsChanged";
import Error404 from "../common/Error404/404";
import Packs from "../../../n2-features/f3-packs/packs/Packs";
import {Cards} from "../../../n2-features/f4-cards/Cards";
import LearnPage from "../../../n2-features/f5-learn/LearnPage";


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
                <Route path={LEARN} element={<LearnPage/>}/>
                <Route path={ERROR_404} element={<Error404/>}/>
                <Route path="*" element={<Navigate to={"/404"}/>}/>
            </Routes>
        </div>
    )
}

export default Routing;