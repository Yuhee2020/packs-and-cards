import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks";
import {Container, Grid} from "@mui/material";
import {GoToPackList} from "./cardsPageHead/GoToPackList";
import {CardsPageHead} from "./cardsPageHead/CardsPageHead";
import {CardSearch} from "./cardsPageHead/CardSearch";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {getCardsTC} from "../../../store/reducers/cards-reducer";
import {CardsPagination} from "./cardsTable/CardsPagination";
import {CardsTableHead} from "./cardsTable/CardsTableHead";
import {EmptyPack} from "./cardsTable/EmptyPack";
import {useParams} from "react-router-dom";
import {CardsTableBody} from "./cardsTable/CardsTableBody";


export const Cards = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const search = useAppSelector(state => state.cards.search)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const debounceSearchValue = useDebounce<string>(search, 1000)
    const sort = useAppSelector(state => state.cards.sort)
    const {packId} = useParams()

    useEffect(() => {
        if (packId != null) {
            dispatch(getCardsTC(packId))
        }
    }, [page, pageCount, sort, debounceSearchValue])


    if (!cards.length && !search.length) {return <EmptyPack/>}

    return (
        <Container maxWidth="lg">
            <GoToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
                <CardSearch/>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <CardsTableHead/>
                    <TableBody>
                        {cards.map((card, i) => <CardsTableBody key={i} card={card}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
                <CardsPagination/>
            </Grid>
        </Container>
    );
};

