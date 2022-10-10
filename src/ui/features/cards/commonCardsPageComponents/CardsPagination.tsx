import React, {ChangeEvent} from 'react';
import {MenuItem, Pagination, Select, SelectChangeEvent, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {setPageAC, setPageCountAC} from "../../../../bll/reducers/cards-reducer";
import {BootstrapInput} from "../../../common/BootstrapInput/BootstrapInput";


export const CardsPagination = () => {
    const dispatch = useAppDispatch()
    const cardsTotalCount=useAppSelector(state => state.cards.cardsTotalCount)
    const pageCount=useAppSelector(state => state.cards.pageCount)
    const changePageHandler=(e: ChangeEvent<unknown>, page: number)=>{
        dispatch(setPageAC(page))
    }
    const handleChange = (event: SelectChangeEvent<any>) => {
        dispatch(setPageCountAC(event.target.value))
    }
    return (
        <Stack direction={"row"} spacing={1}>
            <Pagination
                count={Math.ceil(cardsTotalCount/pageCount)}
                shape="rounded"
                onChange={changePageHandler}
            />
            <Select
                value={pageCount}
                size={"small"}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
            </Select>
            <span>cards per page</span>
        </Stack>
    );
};

