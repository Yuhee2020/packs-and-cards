import React, {ChangeEvent} from 'react';
import {MenuItem, Pagination, Select, SelectChangeEvent, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {changePacksPageAC, setPacksPageCountAC} from "../../../../store/reducers/packs-reducer";
import {BootstrapInput} from "../../../common/BootstrapInput/BootstrapInput";


export const PacksPagination = () => {
    const dispatch = useAppDispatch()
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
    const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(changePacksPageAC(page))
    }
    const handleChangePageCount = (event: SelectChangeEvent<any>) => {
        dispatch(setPacksPageCountAC(event.target.value));
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center" textAlign={'center'}>
            <Pagination
                count={Math.ceil(cardPacksTotalCount / pageCount)}
                onChange={changePageHandler}
                shape="rounded"/>
            <div>
                Show
                <Select
                    id="page-count-select"
                    value={pageCount}
                    onChange={handleChangePageCount}
                    size={"small"}
                    style={{marginLeft:"6px", marginRight: "6px"}}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </Select>
                Packs per page
            </div>
        </Stack>
    );
};

