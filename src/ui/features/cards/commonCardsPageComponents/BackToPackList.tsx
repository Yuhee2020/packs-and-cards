import React from 'react';
import s from "../Cards.module.css";
import {NavLink} from "react-router-dom";
import {PACKS} from "../../../routing/Routing";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useAppDispatch} from "../../../../utils/hooks";
import {searchCardsAC} from "../../../../bll/reducers/cards-reducer";

export const BackToPackList = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={s.backToPacks}>
            <NavLink onClick={()=>{dispatch(searchCardsAC(""))}} to={PACKS}> <KeyboardBackspaceIcon sx={{position: 'relative', top: '6px'}}/> Back to Packs
                List</NavLink>
        </div>
    );
};

