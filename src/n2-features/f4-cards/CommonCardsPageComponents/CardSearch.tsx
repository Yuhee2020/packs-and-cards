import React from 'react';
import s from "../Cards.module.css";
import {FormControl, Grid, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {searchCardsAC} from "../../../n1-main/m2-bll/reducers/cards-reducer";

export const CardSearch = () => {
    const dispatch = useAppDispatch()
    const searchValue = useAppSelector(state => state.cards.search)
    return (
        <Grid item xs={12}>
            <div className={s.search}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="input-search">Provide your text</InputLabel>
                    <OutlinedInput

                        placeholder={"search"}
                        id="input-search"
                        value={searchValue}
                        onChange={(e) => {
                            dispatch(searchCardsAC(e.currentTarget.value))
                        }}
                        startAdornment={<InputAdornment position="start"><SearchIcon
                            color="disabled"/></InputAdornment>}
                        label="Provide your text"
                    />
                </FormControl>
            </div>
        </Grid>
    );
};

