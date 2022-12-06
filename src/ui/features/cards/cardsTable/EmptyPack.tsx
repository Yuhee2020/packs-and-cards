import React from 'react';
import {Container, Grid} from "@mui/material";
import {GoToPackList} from "../cardsPageHead/GoToPackList";
import {CardsPageHead} from "../cardsPageHead/CardsPageHead";
import s from "../Cards.module.css";
import {useAppSelector} from "../../../../utils/hooks";
import {AddNewCardModal} from "../cardsModals/AddNewCardModal";

export const EmptyPack = () => {

    const cards = useAppSelector(state => state.cards)
    const isMyPack = useAppSelector(state => state.cards.isMyPack)

    return (
        <Container maxWidth="lg">
            <GoToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
            </Grid>
            {isMyPack
                ? <div className={s.emptyPack}>
                    <div>This pack is empty. Click add new card to fill this pack</div>
                    <AddNewCardModal cardsPackId={cards.cardsPackId}/>
                </div>
                : <div className={s.emptyPack}>
                    This pack is empty. Back to Pack List and change another Pack
                </div>
            }
        </Container>
    );
};

