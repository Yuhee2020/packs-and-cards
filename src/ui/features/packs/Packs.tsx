import React, {useEffect} from "react";
import {Container, Grid, Paper, Table, TableBody, TableContainer} from "@mui/material";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks";
import {setPacksTC} from "../../../store/reducers/packs-reducer";
import {PacksPagination} from "./PacksPageHeader/PacksPagination";
import {PacksPageHeader} from "./PacksPageHeader/PacksPageHeader";
import {PacksTableHead} from "./PacksTable/PacksTableHead";
import PacksTableBody from "./PacksTable/PacksTableBody";


const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector(state => state.packs.cardPacks);
    const isMyId = useAppSelector(state => state.packs.isMyId);
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const search = useAppSelector(state => state.packs.search);
    const debounceSearchValue = useDebounce<string>(search, 700);
    const sort =useAppSelector(state => state.packs.sort)

    useEffect(() => {
        dispatch(setPacksTC())
    }, [debounceSearchValue, page, isMyId, pageCount, sort])




    return <Container maxWidth="lg">
        <PacksPageHeader/>
        <Grid container spacing={1} marginTop={'8px'}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <PacksTableHead/>
                    <TableBody>
                        {packs.map((pack,index) =><PacksTableBody pack={pack} key={index}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            {search && packs.length < 1 &&
                <div style={{marginTop: '20px'}}><span>There are no packs with this name...</span></div>}
            {!search && packs.length < 1 && <div style={{marginTop: '20px'}}><span>Packs not found...</span></div>}
        </Grid>
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
            <PacksPagination/>
        </Grid>
    </Container>
}

export default Packs;

