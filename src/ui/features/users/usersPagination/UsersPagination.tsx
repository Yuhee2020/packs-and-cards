import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import React, {ChangeEvent} from "react";

import {MenuItem, Pagination, Select, SelectChangeEvent, Stack} from "@mui/material";
import {BootstrapInput} from "../../../common/BootstrapInput/BootstrapInput";
import {setPageAC, setUsersCountAC} from "../../../../store/reducers/users-reducer";

export const UsersPagination = () => {
    const dispatch = useAppDispatch()
    const UsersTotalCount=useAppSelector(state => state.users.usersTotalCount)
    const pageCount=useAppSelector(state => state.users.pageCount)
    const changePageHandler=(e: ChangeEvent<unknown>, page: number)=>{
        dispatch(setPageAC(page))
    }
    const handleChange = (event: SelectChangeEvent<any>) => {
        dispatch(setUsersCountAC(event.target.value))
    }
    return (
        <Stack direction={"row"} spacing={1}>
            <Pagination
                count={Math.ceil(UsersTotalCount/pageCount)}
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
                <MenuItem value={20}>20</MenuItem>
            </Select>
            <span>users per page</span>
        </Stack>
    );
};