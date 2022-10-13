import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, FormGroup, IconButton, Stack, TextField} from "@mui/material";
import {updateCardTC} from "../../../bll/reducers/cards-reducer";
import {useAppDispatch} from "../../../utils/hooks";
import {useFormik} from "formik";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {CardType} from "../../../dal/cards-api";
import s from "./modal.module.css";
import {convertFileToBase64} from "../../../utils/base64Converter";
import {setAppErrorAC} from "../../../bll/reducers/app-reducer";


type PropsType = {
    card: CardType
}

export const EditCardModal = ({card}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!open)
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files.length) {
            debugger
            const file = e.target.files[0]

            if (file.size < 200000) {
                convertFileToBase64(file, (file64: string) => {
                    formik.setFieldValue(field, file64)
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }

    const formik = useFormik({
        initialValues: {
            question: card.question,
            answer: card.answer,
            answerImg: card.answerImg,
            questionImg: card.questionImg
        },
        onSubmit: values => {
            dispatch(updateCardTC({...values, _id: card._id}))
            handleOpenClose()
        },
    });
    return (
        <div>
            <IconButton onClick={handleOpenClose}><BorderColorIcon
                fontSize={"small"}/></IconButton>
            <BasicModal title={'Edit card'} open={open} handleOpenClose={handleOpenClose}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction={"column"} spacing={2} justifyContent={"space-evenly"}>
                        {card.questionImg ? <Stack direction={"column"} spacing={1} alignItems={"center"}>
                                <img className={s.qaImg}
                                     src={formik.values.questionImg ? formik.values.questionImg : card.questionImg}
                                     alt={"question"}/>
                                <Button fullWidth variant={"contained"} component="label">
                                    Download question
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={e => uploadHandler(e, "questionImg")}
                                        name={"questionImg"}
                                    />
                                </Button>
                                <img className={s.qaImg} src={formik.values.answerImg?formik.values.answerImg:card.answerImg} alt={"answer"}/>
                                <Button fullWidth variant={"contained"} component="label">
                                    Download answer
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={e => uploadHandler(e, "answerImg")}
                                        name={"answerImg"}
                                    />
                                </Button>
                            </Stack>
                            : <FormGroup>
                                <TextField style={{margin: "10px 0"}}
                                           label="Question"
                                           variant="standard"
                                           type="text"
                                           {...formik.getFieldProps('question')}
                                />
                                <TextField
                                    style={{margin: "10px 0"}}
                                    label="Answer"
                                    variant="standard"
                                    type="text"
                                    {...formik.getFieldProps('answer')}
                                />
                            </FormGroup>}
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Button variant={'contained'} style={{width: "100px"}} color={'inherit'}
                                    onClick={handleOpenClose}>
                                Cancel
                            </Button>
                            <Button type={'submit'} variant={'contained'} style={{width: "100px"}} color={'primary'}>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>

            </BasicModal>
        </div>
    );
};
