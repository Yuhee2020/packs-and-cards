import React, {useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, FormGroup, Stack, TextField} from "@mui/material";
import {addCardTC} from "../../../bll/reducers/cards-reducer";
import {useAppDispatch} from "../../../utils/hooks";
import {useFormik} from "formik";


type PropsType = {
    cardsPackId: string
}

export const AddNewCardModal = ({cardsPackId}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!open)
        formik.resetForm()
    };
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
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
