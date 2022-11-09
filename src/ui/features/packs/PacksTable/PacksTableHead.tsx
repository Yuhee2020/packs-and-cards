import React from 'react';
import {IconButton, TableCell, TableHead, TableRow} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {setSortPacksAC} from "../../../../store/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";

export const PacksTableHead = () => {
    const dispatch = useAppDispatch();
    const sort =useAppSelector(state => state.packs.sort)
    const sortHandler = () => {
        dispatch(setSortPacksAC())
    }
    return (
        <TableHead style={{background: '#EFEFEF'}}>
            <TableRow>

                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Cards</TableCell>
                <TableCell align="center" onClick={sortHandler}><IconButton>{sort === "0updated" ?
                    <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}</IconButton>Updated</TableCell>
                <TableCell align="left">Created by</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

