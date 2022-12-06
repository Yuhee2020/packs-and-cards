import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../common/modals/BasicModal";
import {
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import {addCardTC} from "../../../../store/reducers/cards-reducer";
import {useAppDispatch} from "../../../../utils/hooks";
import {useFormik} from "formik";
import {convertFileToBase64} from "../../../../utils/base64Converter";
import {setAppErrorAC} from "../../../../store/reducers/app-reducer";
import s from "../../../common/modals/modal.module.css"


type PropsType = {
    cardsPackId: string
}

export const AddNewCardModal = ({cardsPackId}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const [format, setFormat] = React.useState('Text');
    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value);
    };
    const handleOpenClose = () => {
        setOpen(!open)
        formik.resetForm()
    };
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>, field:string) => {
        if (e.target.files && e.target.files.length) {
            debugger
            const file = e.target.files[0]

            if (file.size < 200000) {
                convertFileToBase64(file, (file64: string) => {
                    formik.setFieldValue(field,file64)
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size, file must be less than 200 kb"))

            }
        }
    }
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            answerImg:'',
            questionImg:''
        },
        onSubmit: values => {
            dispatch(addCardTC({...values, cardsPack_id: cardsPackId}))
            handleOpenClose()
            formik.resetForm()
        },
    });
    return (
        <div>
            <Button onClick={handleOpenClose} variant="contained"> Add new card </Button>
            <BasicModal title={'Add new Card'} open={open} handleOpenClose={handleOpenClose}>
                <FormControl fullWidth>
                    <Select
                        value={format}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value={"Text"}>Text</MenuItem>
                        <MenuItem value={"Picture"}>Picture</MenuItem>
                    </Select>
                    <FormHelperText>Choose a question format</FormHelperText>
                </FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction={"column"} spacing={3} justifyContent={"space-evenly"}>
                        {format === "Text"
                            ? <FormGroup>
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
                            </FormGroup>
                            : <Stack direction={"column"} spacing={1} alignItems={"center"}>
                                {formik.values.questionImg && <img className={s.qaImg} src={formik.values.questionImg} alt={"question"}/>}
                                <Button fullWidth variant={"contained"} component="label">
                                    Download question
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={e=>uploadHandler(e,"questionImg")}
                                        name={"questionImg"}
                                        />
                                </Button>
                                {formik.values.answerImg && <img className={s.qaImg} src={formik.values.answerImg} alt={"answer"}/>}
                                <Button fullWidth variant={"contained"} component="label">
                                    Download answer
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={e=>uploadHandler(e,"answerImg")}
                                        name={"answerImg"}
                                        />
                                </Button>
                            </Stack>}
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


