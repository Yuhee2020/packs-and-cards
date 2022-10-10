import React, {useEffect, useState, ChangeEvent} from "react";
import {getCardsTC, updateCardGradeTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {
    Button,
    Container,
    FormControl,
    FormControlLabel, FormLabel,
    Paper, Radio,
    RadioGroup,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../n1-main/m1-ui/hooks";
import {CardType} from "../../n1-main/m3-dal/api/cards-api";
import {BackToPackList} from "../f4-cards/CommonCardsPageComponents/BackToPackList";
import s from './LearnPage.module.css';
import {useParams} from "react-router-dom";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

const LearnPage = () => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useAppSelector(state => state.cards.cards);
    const packName = useAppSelector(state => state.cards.packName);
    const {packId} = useParams();

    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',

        answer: '',
        question: '',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        user_id: '',

        created: '',
        updated: '',
    });
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(packId || '', true));
            setFirst(false);
        }

        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, packId, cards, first]);


    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            dispatch(updateCardGradeTC(value, packId || '', card._id))
        }
    }

    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <div className={s.learnContainer}>
                <div className={s.packTitleContainer}>
                    <span>Learn "{packName}"</span>
                </div>
                <Paper elevation={14} style={{padding: "30px", width: '350px'}}>
                    <div>
                        <div className={s.question}>
                            <p><b>Question:</b> {card.question}</p>
                        </div>
                        <div className={s.attemptsNumber}>
                            <span>Number of attempts to answer a question: {card.shots}</span>
                        </div>

                        {isChecked && (
                            <>
                                <div>
                                    <p><b>Answer:</b> {card.answer}</p>
                                </div>

                                <FormControl>
                                    <FormLabel>Rate yourself:</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        value={value}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                                    >
                                        {grades.map((g, i) => (
                                            <FormControlLabel
                                                key={'grade-' + i}
                                                value={g}
                                                control={<Radio/>}
                                                label={g}/>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </>
                        )}
                        <div className={s.buttonsContainer}>
                            {!isChecked
                                ? <Button
                                    variant={'contained'}
                                    onClick={() => setIsChecked(true)}
                                    fullWidth>
                                    Show answer
                                </Button>
                                : <Button
                                    variant={'contained'}
                                    onClick={onNext}
                                    fullWidth>
                                    Next question
                                </Button>
                            }
                        </div>
                    </div>
                </Paper>
            </div>
        </Container>
    );
};

export default LearnPage;