import React from 'react';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {IconButton} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {setSortAC} from "../../../../store/reducers/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";

export const CardsTableHead = () => {
    const dispatch = useAppDispatch()
    const sort= useAppSelector(state => state.cards.sort)
    const isMyPack=useAppSelector(state =>state.cards.isMyPack)
    const sortHandler = () => {
        dispatch(setSortAC())
    }
    return (
        <TableHead style={{background: '#EFEFEF'}}>
            <TableRow>
                <TableCell align="left">Questions</TableCell>
                <TableCell align="left">Answers</TableCell>
                <TableCell align="left" onClick={sortHandler}><IconButton>{sort === "0updated" ?
                    <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}</IconButton>updated</TableCell>
                <TableCell align="left">grade</TableCell>
                {isMyPack && <TableCell align="left">actions</TableCell>}
            </TableRow>
        </TableHead>
    );
};

