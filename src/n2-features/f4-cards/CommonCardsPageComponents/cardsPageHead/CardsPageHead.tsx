import React from 'react';
import {Button, Grid, Stack} from "@mui/material";
import s from "../../Cards.module.css";
import {useAppSelector} from "../../../../n1-main/m1-ui/hooks";
import {Menushka} from "./Menushka";
import {AddNewCardModal} from "../../../f5-modals/AddNewCardModal";
import {useNavigate} from "react-router-dom";


export const CardsPageHead = () => {

    const cards = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile._id)

    const navigate = useNavigate()

    const learnPackHandler = (packId: string) => {
        navigate(`/learn/${packId}`)
    }

    return (
        <>
            <Grid item xs={10}>
                <Stack className={s.packName} direction={"row"}>{cards.packName}<Menushka/></Stack>
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

