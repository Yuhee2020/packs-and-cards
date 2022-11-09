import React from 'react';
import TableCell from "@mui/material/TableCell";
import {Rating, Stack} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {useAppSelector} from "../../../../utils/hooks";
import {CardType} from "../../../../api/cards-api";
import {DeleteCardModal} from "../../modals/DeleteCard.Modal";
import {EditCardModal} from "../../modals/EditCardModal";
import s from "../Cards.module.css"

type PropsType={
    card:CardType
}

export const CardsTableBody = ({card}:PropsType) => {

    const isMyPack=useAppSelector(state =>state.cards.isMyPack)

    return (
            <TableRow
                hover
                key={card._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell align="left" width={"39%"}>{card.questionImg? <img alt={"question"} className={s.pic} src={card.questionImg}/> :card.question}</TableCell>
                <TableCell align="left" width={"36%"}>{card.answerImg? <img alt={"answer"} className={s.pic} src={card.answerImg}/> :card.answer}</TableCell>
                <TableCell align="center" width={"14%"}>{card.updated.slice(0, 10)}</TableCell>
                <TableCell align="left" width={"9%"}>
                    <Rating size={"small"} name="grade" value={card.grade} readOnly />
                </TableCell>
                {isMyPack && <TableCell align="left" width={"2%"}>
                    <Stack direction={"row"} spacing={0}>
                        <EditCardModal card={card}/>
                        <DeleteCardModal card={card}/>
                    </Stack>
                </TableCell>}
            </TableRow>
    );
};
