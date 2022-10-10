import React, { useEffect, useState } from 'react'
import { Box, Slider } from '@mui/material'
import style from '../Packs.module.css'
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks'
import {setCardsRangeAC, setCardsRangeTC} from "../../../../bll/reducers/packs-reducer";

export const NumberOfCards = () => {
    const dispatch = useAppDispatch()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)

    const [value, setValue] = useState<number | number[]>([min, max])

    useEffect(() => {
        setValue([min, max])
    }, [min, max])

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
        dispatch(setCardsRangeAC(minCardsCount, maxCardsCount))
    }, [minCardsCount, maxCardsCount])

    useEffect(() => {
        setValue([min, max])
    }, [min, max])

    const sliderChangeHandler = (event: React.SyntheticEvent | Event, value: number | number[]) => {
        setValue(value)
    }

    const onChangeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
        if (!Array.isArray(value)) {
            return
        }

        dispatch(setCardsRangeTC({min: value[0], max: value[1]}))
    }

    return (
        <div className={style['slider-box']}>
            <div className={style.slider}>
                <span>{min}</span>
                <Box sx={{ width: 300 }}>
                    <Slider
                        min={minCardsCount}
                        max={maxCardsCount}
                        onChange={sliderChangeHandler}
                        onChangeCommitted={onChangeCommitted}
                        value={value}
                        valueLabelDisplay="off"
                        color="primary"
                    />
                </Box>
                <span>{max}</span>
            </div>
        </div>
    )
}