import React, {useEffect} from 'react';
import './App.css';
import Main from "./main/Main";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {initializeAppTC} from '../bll/reducers/auth-reducer';
import {CircularProgress} from "@mui/material";

function App() {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state => state.auth.isInitialized);

    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    }

    return (
        <div>
            <Main/>
        </div>

    );
}

export default App;
