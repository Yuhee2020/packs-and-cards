import {packsAPI} from "../../api/packs-api/packs-api";
import {AppRootStateType, AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";
import {setPackNameAC} from "./cards-reducer";
import {cover} from "../../ui/common/images/cover";
import {GetPacksResponseType, PackType, UpdatePackDataType} from "../../api/packs-api/packsTypes";


const initialState = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 100,
    minCardsCount: 0,
    min: 0,
    max: 110,
    search: '',
    page: 1, // выбранная страница
    pageCount: 5,
    isMyId: false,
    sort: "0updated"
}

//reducer
export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': {

            return {
                ...state,
                cardPacks: action.data.cardPacks.map(pack=> ({...pack, deckCover:pack.deckCover ? pack.deckCover : cover
                }) ),
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                maxCardsCount: action.data.maxCardsCount,
                minCardsCount: action.data.minCardsCount,
                page: action.data.page,
                pageCount: action.data.pageCount
            }
        }
        case 'packs/SEARCH-PACKS': {
            return ({...state, search: action.search})
        }
        case 'packs/CHANGE-PACKS-PAGE': {
            return {...state, page: action.page}
        }
        case 'packs/SET-MY-PACKS-TO-PAGE': {
            return {...state, isMyId: action.isMyId}
        }
        case 'packs/SET-PACKS-COUNT': {
            return {...state, minCardsCount: action.sliderValue[0], maxCardsCount: action.sliderValue[1]}
        }
        case 'packs/RESET-ALL-PACKS-FILTER': {
            return {
                ...state,
                search:"",
                isMyId: false,
                sort: "0updated",
                min: state.minCardsCount,
                max: state.maxCardsCount,
            }
        }
        case 'packs/SET-CARDS-RANGE': {
            return {
                ...state,
                min: action.min,
                max: action.max,
            }
        }
        case 'packs/SET-PACKS-PAGE-COUNT': {
            return {
                ...state,
                pageCount: action.pageCount
            }
        }
        case 'packs/SET-PACKS-SORT': {
            return {
                ...state,
                sort: state.sort === "0updated" ? "1updated" : "0updated"
            }
        }
        case "packs/SET-DEF-COVER":{
            return {...state, cardPacks: state.cardPacks.map(pack=>pack._id===action.id?{...pack, deckCover:cover}:pack)}
        }
        case "packs/CHANGE-COVER":{
            return {...state, cardPacks: state.cardPacks.map(pack=>pack._id===action.id?{...pack, deckCover:action.cover}:pack)}
        }
        default:
            return state;
    }
}

//action creators
export const setPacksAC = (data: GetPacksResponseType) => {
    return {
        type: 'packs/SET-PACKS',
        data
    } as const
}
export const searchPacksAC = (search: string) => {
    return {
        type: 'packs/SEARCH-PACKS',
        search
    } as const
}
export const changePacksPageAC = (page: number) => {
    return {
        type: 'packs/CHANGE-PACKS-PAGE',
        page
    } as const
}
export const setMyPacksToPageAC = (isMyId: boolean) => {
    return {
        type: 'packs/SET-MY-PACKS-TO-PAGE',
        isMyId
    } as const
}
export const setPacksCountAC = (sliderValue: Array<number>) => {
    return {
        type: 'packs/SET-PACKS-COUNT',
        sliderValue
    } as const
}
export const resetAllPacksFilterAC = () => {
    return {
        type: 'packs/RESET-ALL-PACKS-FILTER',
    } as const
}
export const setCardsRangeAC = (min: number, max: number) => {
    return {
        type: 'packs/SET-CARDS-RANGE',
        min,
        max
    } as const
}
export const setPacksPageCountAC = (pageCount: number) => {
    return {
        type: 'packs/SET-PACKS-PAGE-COUNT',
        pageCount
    } as const
}
export const setSortPacksAC = () => {
    return {
        type: 'packs/SET-PACKS-SORT',
    } as const
}

export const setDefaultCoverAC = (id:string) => {
    return {
        type: 'packs/SET-DEF-COVER',
        id
    } as const
}

export const changeCoverAC = (id:string, cover:string) => {
    return {
        type: 'packs/CHANGE-COVER',
        id, cover
    } as const
}

///thunks
export const setPacksTC = (): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    const {search, page, pageCount, isMyId, min, max, sort} = getState().packs;
    const _id = getState().profile._id;

    packsAPI.getPacks({
        packName: search, user_id: isMyId ? _id : '',
        page, pageCount,
        min, max, sortPacks:sort
    })
        .then(res => {
            dispatch(setPacksAC(res.data))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message

            if (error === "you are not authorized /ᐠ-ꞈ-ᐟ\\")
                return

            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
}

export const createPackTC = (cardsPack: { name?: string, deckCover?: string, private_?: boolean }): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.createPack({cardsPack})
        .then(() => {
            dispatch(setPacksTC());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const deletePackTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.deletePack(id)
        .then(() => {
            dispatch(setPacksTC());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const updatePackTC = (data: UpdatePackDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.updatePack(data)
        .then(() => {
            dispatch(setPacksTC());
            dispatch(setPackNameAC(data.name))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const setCardsRangeTC = (range: { min: number; max: number }): AppThunk => (dispatch) => {
    dispatch(setCardsRangeAC(range.min, range.max))
    dispatch(setPacksTC())
}

export const resetAllPacksFilterTC = (): AppThunk => (dispatch) => {
    dispatch(resetAllPacksFilterAC())
    dispatch(setPacksTC())
}


//types
export type PacksStateType = typeof initialState;
export type PacksActionsType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof searchPacksAC>
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof setMyPacksToPageAC>
    | ReturnType<typeof setPacksCountAC>
    | ReturnType<typeof resetAllPacksFilterAC>
    | ReturnType<typeof setCardsRangeAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof setPacksPageCountAC>
    | ReturnType<typeof setDefaultCoverAC>
    | ReturnType<typeof changeCoverAC>
    ;