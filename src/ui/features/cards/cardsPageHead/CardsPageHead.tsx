import React from 'react';
import {Button, Grid, Stack} from "@mui/material";
import s from "../Cards.module.css";
import {useAppSelector} from "../../../../utils/hooks";
import {Menushka} from "./Menushka";
import {AddNewCardModal} from "../cardsModals/AddNewCardModal";
import {useNavigate} from "react-router-dom";
import cov from "../../../common/images/successful.png"


export const CardsPageHead = () => {

    const cards = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile._id)
    const cover = useAppSelector(state => state.packs.cardPacks.find(el=>el._id===cards.cardsPackId)?.deckCover)
    const navigate = useNavigate()
    const learnPackHandler = (packId: string) => {
        navigate(`/learn/${packId}`)
    }

    return (
        <>
            <Grid item xs={10}>
                <Stack className={s.packName} direction={"row"} alignItems={"center"}>
                    <img alt="cover" className={s.cover} src={cover? cover : cov} />
                    {cards.packName}
                    <Menushka/>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                {userId !== cards.packUserId && cards.cards.length
                    ? <Button variant="contained"
                              onClick={() => learnPackHandler(cards.cardsPackId)}>Learn pack</Button> : null}
                {userId === cards.packUserId && cards.cards.length
                    ? <AddNewCardModal cardsPackId={cards.cardsPackId}/> : null}
            </Grid>
        </>
    );
};

