import React from 'react';
import {FormControl, Grid, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {setUserNameAC} from "../../../../store/reducers/users-reducer";

export const UserSearch = () => {
    const dispatch = useAppDispatch()
    const userName = useAppSelector(state => state.users.userName)
    return (
        <Grid item xs={12}>
            <div>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="input-search">Provide your text</InputLabel>
                    <OutlinedInput

                        placeholder={"search"}
                        id="input-search"
                        value={userName}
                        onChange={(e) => {
                            dispatch(setUserNameAC(e.currentTarget.value))
                        }}
                        startAdornment={<InputAdornment position="start"><SearchIcon
                            color="disabled"/></InputAdornment>}
                        label="Enter user name"
                    />
                </FormControl>
            </div>
        </Grid>
    );
};


