import React from 'react';
import TableCell from "@mui/material/TableCell";
import {Rating, Stack} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {CardType} from "../../../n1-main/m3-dal/api/cards-api";
import {DeleteCardModal} from "../../f5-modals/DeleteCard.Modal";
import {EditCardModal} from "../../f5-modals/EditCardModal";

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
                <TableCell align="left" width={"39%"}>{card.question}</TableCell>
                <TableCell align="left" width={"36%"}>{card.answer}</TableCell>
                <TableCell align="center" width={"13%"}>{card.updated.slice(0, 10)}</TableCell>
                <TableCell align="left" width={"9%"}>
                    <Rating name="grade" value={card.grade} readOnly />
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
