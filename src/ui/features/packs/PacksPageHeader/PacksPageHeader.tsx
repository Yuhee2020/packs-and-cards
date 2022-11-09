import React from 'react';
import {
    Button,
    ButtonGroup,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {AddNewPackModal} from "../../modals/AddNewPackModal";
import SearchIcon from "@mui/icons-material/Search";
import {NumberOfCards} from "./NumberOfCards";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {resetAllPacksFilterTC, searchPacksAC, setMyPacksToPageAC} from "../../../../store/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";

export const PacksPageHeader = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector(state => state.packs.search);
    const isMyId = useAppSelector(state => state.packs.isMyId);
    const searchPacksHandler = (search: string) => {
        dispatch(searchPacksAC(search))
    }
    const setMyPacksHandler = (isMyPack: boolean) => {
        dispatch(setMyPacksToPageAC(isMyPack))
    }
    const resetAllFilter = () => {
        dispatch(resetAllPacksFilterTC())
    }

    return (
        <>
            <Grid container spacing={2} marginTop={'8px'}>
                <Grid item xs={9}>
                    <h2>Packs list</h2>
                </Grid>
                <Grid item xs={3}>
                    <AddNewPackModal/>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={5}>
                    <FormControl fullWidth sx={{m: 1}} variant="outlined">
                        <InputLabel htmlFor="input-search">Find packs</InputLabel>
                        <OutlinedInput
                            id="input-search"
                            value={search}
                            onChange={(e) => {
                                searchPacksHandler((e.currentTarget.value))
                            }}
                            startAdornment={<InputAdornment position="start"><SearchIcon
                                color="disabled"/></InputAdornment>}
                            label="Find packs"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={3} textAlign={"center"}>
                    <div><b>Show packs cards</b></div>
                    <ButtonGroup
                        variant="contained"
                    >
                        <Button
                            onClick={() => setMyPacksHandler(true)}
                            color={isMyId ? 'primary' : 'inherit'}
                        >My</Button>
                        <Button
                            onClick={() => setMyPacksHandler(false)}
                            color={!isMyId ? 'primary' : 'inherit'}
                        >All</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={3}>
                    <div style={{textAlign:"center"}}><b>Number of cards</b></div>
                    <NumberOfCards/>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        aria-label="Example"
                        onClick={resetAllFilter}>
                        <FilterAltOffIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

