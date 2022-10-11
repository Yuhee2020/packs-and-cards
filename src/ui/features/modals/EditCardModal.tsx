import React, {useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, FormGroup, IconButton, Stack, TextField} from "@mui/material";
import {updateCardTC} from "../../../bll/reducers/cards-reducer";
import {useAppDispatch} from "../../../utils/hooks";
import {useFormik} from "formik";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {CardType} from "../../../dal/cards-api";


type PropsType = {
    card: CardType
}

export const EditCardModal = ({card}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!open)
    };
    const formik = useFormik({
        initialValues: {
            question: card.question,
            answer: card.answer,
        },
        onSubmit: values => {
            dispatch(updateCardTC({...values,_id:card._id}))
            handleOpenClose()
        },
    });
    return (
        <div>
            <IconButton onClick={handleOpenClose}><BorderColorIcon
                fontSize={"small"}/></IconButton>
            <BasicModal title={'Edit card'} open={open} handleOpenClose={handleOpenClose}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction={"column"} spacing={10} justifyContent={"space-evenly"}>
                        <FormGroup >
                            <TextField style={{margin:"10px 0"}}
                                       label="Question"
                                       variant="standard"
                                       type="text"
                                       {...formik.getFieldProps('question')}
                            />
                            <TextField
                                style={{margin:"10px 0"}}
                                label="Answer"
                                variant="standard"
                                type="text"
                                {...formik.getFieldProps('answer')}
                            />
                        </FormGroup>
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
