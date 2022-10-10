import React, {ChangeEvent} from 'react';
import {InputBase, MenuItem, Pagination, Select, SelectChangeEvent, Stack, styled} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {setPageAC, setPageCountAC} from "../../../n1-main/m2-bll/reducers/cards-reducer";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 15,
        padding: '2px 2px 2px 5px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));



export const MyPagination = () => {
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

