import {AppThunk} from "../store";
import {handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI} from "../../api/cards-api/cards-api";
import {CardType, GetCardsResponseType, PostCardType, UpdateCardType} from "../../api/cards-api/cardsTypes";



let initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: "",
    packName: "",
    cardsPackId: "",
    sort: "0updated",
    search: "",
    isMyPack: false
}

//reducer
export const cardsReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case "CARDS/GET-CARDS": {
            return {
                ...state,
                cards: action.cards.cards,
                cardsTotalCount: action.cards.cardsTotalCount,
                pageCount: action.cards.pageCount,
                page: action.cards.page,
                maxGrade: action.cards.maxGrade,
                minGrade: action.cards.maxGrade,
                packUserId: action.cards.packUserId,
                packName: action.cards.packName,
                cardsPackId: action.cardsPackId
            }
        }
        case "CARDS/SEARCH_CARDS": {
            return {...state, search: action.search}
        }
        case "CARDS/SET-PAGE": {
            return {...state, page: action.page}
        }
        case "CARDS/SET-PAGE-COUNT": {
            return {...state, pageCount: action.pageCount}
        }
        case "CARDS/SET-SORT": {
            return {
                ...state,
                sort: state.sort === "0updated" ? "1updated" : "0updated"
            }
        }
        case "CARDS/SET-IS-MY-PACK": {
            return {...state, isMyPack: action.isMyPack}
        }
        case "CARDS/SET-PACK-NAME": {
            return {...state, packName: action.name}
        }

        default:
            return state
    }
}

//actions
export const getCardsAC = (cards: GetCardsResponseType, cardsPackId: string) => {
    return {
        type: 'CARDS/GET-CARDS',
        cards, cardsPackId
    } as const
}

export const setIsMyPackAC = (isMyPack: boolean) => {
    return {
        type: 'CARDS/SET-IS-MY-PACK',
        isMyPack
    } as const
}

export const searchCardsAC = (search: string) => {
    return {
        type: 'CARDS/SEARCH_CARDS',
        search
    } as const
}

export const setPageCountAC = (pageCount: number) => {
    return {
        type: 'CARDS/SET-PAGE-COUNT',
        pageCount
    } as const
}

export const setPageAC = (page: number) => {
    return {
        type: 'CARDS/SET-PAGE',
        page
    } as const
}

export const setSortAC = () => {
    return {
        type: 'CARDS/SET-SORT',
    } as const
}


export const setPackNameAC = (name: string) => {
    return {
        type: 'CARDS/SET-PACK-NAME',
        name,
    } as const
}


//thunks
export const getCardsTC = (packId: string, all?: boolean): AppThunk => {
    return (dispatch, getState) => {
        const {pageCount, page, sort, search, cardsTotalCount} = getState().cards
        const packUserId = getState().profile._id
        dispatch(setAppStatusAC("loading"))
        cardsAPI.getCards({
            pageCount: all ? cardsTotalCount : pageCount,
            page,
            sortCards: sort,
            cardQuestion: search,
            cardsPack_id: packId
        })
            .then(res => {
                dispatch(getCardsAC(res.data, packId))
                const isMyPack = res.data.packUserId === packUserId
                dispatch(setIsMyPackAC(isMyPack))
            })
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}

export const addCardTC = (cards: PostCardType): AppThunk => {
    return (dispatch, getState) => {
        const packId = getState().cards.cardsPackId
        dispatch(setAppStatusAC("loading"))
        cardsAPI.postCard(cards)
            .then(() => dispatch(getCardsTC(packId)))
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}

export const deleteCardTC = (cardId: string): AppThunk => {
    return (dispatch, getState) => {
        const packId = getState().cards.cardsPackId
        dispatch(setAppStatusAC("loading"))
        cardsAPI.deleteCard(cardId)
            .then(() => dispatch(getCardsTC(packId)))
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}

export const updateCardTC = (card:UpdateCardType): AppThunk => {
    return (dispatch, getState) => {
        const packId = getState().cards.cardsPackId
        dispatch(setAppStatusAC("loading"))
        cardsAPI.updateCard(card)
            .then(() => dispatch(getCardsTC(packId)))
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}

export const updateCardGradeTC = (stringGrade: string, packId: string, cardId: string): AppThunk => {
    let grade: number;

    switch (stringGrade) {
        case "Did not know": {
            grade = 1;
            break;
        }
        case 'Forgot': {
            grade = 2;
            break;
        }
        case "A lot of thought": {
            grade = 3;
            break;
        }
        case 'Confused': {
            grade = 4;
            break;
        }
        case "Knew the answer": {
            grade = 5;
            break;
        }
        default: {
            grade = 1;
        }
    }

    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        cardsAPI.updateCardGrade(grade, cardId)
            .then(() => dispatch(getCardsTC(packId)))
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}

//types
export type ActionsType =
    ReturnType<typeof getCardsAC> |
    ReturnType<typeof searchCardsAC> |
    ReturnType<typeof setPageAC> |
    ReturnType<typeof setSortAC> |
    ReturnType<typeof setPageCountAC> |
    ReturnType<typeof setIsMyPackAC> |
    ReturnType<typeof setPackNameAC>

export type StateType = typeof initialState;

