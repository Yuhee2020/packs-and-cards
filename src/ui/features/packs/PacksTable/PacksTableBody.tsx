import React from 'react';
import {IconButton, TableCell, TableRow} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import s from "../Packs.module.css";
import SchoolIcon from "@mui/icons-material/School";
import {EditPackModal} from "../packsModals/EditPackModal";
import {DeletePackModal} from "../packsModals/DeletePackModal";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {setDefaultCoverAC} from "../../../../store/reducers/packs-reducer";
import {USERS} from "../../../routing/Routing";
import {PackType} from "../../../../api/packs-api/packsTypes";


type PropsType = {
    pack: PackType
}

export const PacksTableBody = ({pack}: PropsType) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const myId = useAppSelector(state => state.profile._id)
    const learnPackHandler = (packId: string) => {
        navigate(`/learn/${packId}`)
    }
    const onErrorHandler=()=>{
        dispatch(setDefaultCoverAC(pack._id))
    }
    let day = pack.updated.slice(8, 10)
    let month = pack.updated.slice(5, 7)
    let year = pack.updated.slice(0, 4)

    return (
        <TableRow
            hover
            key={pack._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align="left" width={"35%"} className={s.name}>
                <NavLink className={s.nav} to={`/cards/${pack._id}`}>
                    {<img onError={onErrorHandler} className={s.cover} src={pack.deckCover} alt={"cover"}/>}{pack.name}
                </NavLink>
            </TableCell>
            <TableCell align="left" width={"15%"}>{pack.cardsCount}</TableCell>
            <TableCell align="center" width={"15%"}>{day + '.' + month + '.' + year}</TableCell>
            <TableCell align="left" width={"20%"}><NavLink className={s.nav} to={USERS+`${pack.user_id}`}>{pack.user_name}</NavLink></TableCell>
            <TableCell align="right" width={"15%"}>
                <IconButton
                    onClick={() => learnPackHandler(pack._id)}
                    disabled={pack.cardsCount === 0}>
                    <SchoolIcon
                        fontSize="small"/>
                </IconButton>
                {pack.user_id === myId &&
                    <div style={{display: 'inline-block'}}>
                        <EditPackModal pack={pack}/>
                    </div>
                }
                {pack.user_id === myId &&
                    <div style={{display: 'inline-block'}}>
                        <DeletePackModal pack={pack}/>
                    </div>
                }
                {pack.user_id !== myId &&
                    <div style={{display: 'inline-block', width: '72px', height: '20px'}}/>
                }
            </TableCell>
        </TableRow>
    )
}


export default PacksTableBody;