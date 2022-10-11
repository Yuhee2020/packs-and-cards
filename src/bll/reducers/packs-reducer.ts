import {GetPacksResponseType, packsAPI, PackType, UpdatePackDataType} from "../../dal/packs-api";
import {AppRootStateType, AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";
import {setPackNameAC} from "./cards-reducer";

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

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': {
            return {
                ...state,
                cardPacks: action.data.cardPacks,
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
            const cover="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAYFBMVEVK1f8YvO7///8Aue0At+030v8dvu7l9vxN1//6/v9GxPDS7/v0+/5jzPI4y/jK7Prt+f2h3faq4ffb9f+04/hxz/N/0/RWyPGP2PXC6fkSxPbG8P+K4f+z6/973v+i5/8LBIteAAALyElEQVR4nO2biZaiOhCGgQSQrQFlkWm7+/3f8qayB4LaCngb858zc0bQkHxUaoPxPCcnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJ6dVFXoHLwxtJ8IDObP5fP7HCi9VEATJ5/eYSnjJyIkgnpx4X4WfAZdJhTGk+nK0mMIvyimhVD61Eyd6JI/h7+5l0/ufibBoEMbpEagk3LjCC/1URxijkvwDEa/m5P0Qs8I+EfIHAPQDtJi5HRGCEzgPgha9ep7/B4Vkt3WUCaFSJMxBheDYq5QfRjXYHvpwthUSPpHPhXzwUJ8AMCiROOoXxPiQ72h5IeGCJRYfw1YE+zpqByPi5+Fj9Pa0CBuNi48bGgTP+jEkgEZ2Nx9atfVCttAIlo9hJ5bGIaSszzJA+MPzDl15/Plz2B2v0Tb0Mc0gpM83tiFwmziu8DQhJZPcy8a4Qm/d2gxg6UbUQRwkf3qNVk8d/AytyywrotOaU58sBUqOfM0bFJJd1ysuKd2DsBMjBbA1YmNk/r68BitINowJ3+yS5/WuACmV2nMoZ0aUiEyVHqwhP9XMT3fzYXwVVpBvlnCImVQrVhtfkHEKh0XIJT5CCAysEbSg3jF8mP8xneKsjv82ohWKMINsYWgZfVMjIoBIFXiGxXXn87mDdKtFmBxGPtbz1rHjUrByKTM4on+rzd1QKC9I7uZaNwiG77tjaTGRJC6PXZqOswtCSwJQsEjNLYT6QQ3SoZn0bGHpsFaqNkKvCm4rQwiZuAQABSvVT+NC/nZA1vRs+ZVosPwVzDk8/IzsqRyapjmSP2U2wnX2R7j4EHZYrG6iisd3+maGf7MIsJ5XsJB+NxdSeJH5ZDzULcmmgpp6KSqoe/K0rQdJoyywzosBmIPlS9Oi+aykFX5/naokSKrTl7VbHXoX+gX4hr0IIHf4MyZ+kRQJF5mDhofvb3HBoihStKw5y65xRtKFHiNc6ukCrC+BchphkqbGnGpc4DGtWViROF5hzct96c4/+ZpM6ntk0JMiILwYeyHjOCcOt12yTXJgw5cdggJnQKgYrxdyUXIEMtQO+x1bRaZvRgBwG9YJCS8XTrP9EQtLhhvbpq2JPh/4mf5uOTcvusY+mCskVQhXIt/CPiFE/0H4ZBgWDWBwxKrG3qga52H14rjK4j6DqT41Wofc8oUg0ZzPt+X8KaTJ4lhsfgvQCumdqHmEo7bTBTyM9LD6mCIBTv1R1jrIp+2bwnD0oQymJix0FMcLwWoIbNJoWVkRGjKttbEi2yK0nGCbfwk3D2NXkayNwSuRiZ4RL6RBkLKjhp0oJIEU1mMkqNhuWbQG0GdNiyaupBxU2AjqkK9HNw8jr+1FHmCHGfSh92MmQEkpJ/ksK7CGWPc99AKsGSqvR69mLJcaVw5Jlx0W0tTJcVr+bUWvgJCLUxmK01DOiuODoaJOGtqRpbWhcv5ZVxRnOUCDPw4fCIuPrO6QU37ScYFhGWZAt5ewJTEDJKzhrMNJA9O0FCzI0JgGrcUlKkwsVnoSC8HiWifMkhBuTRn/AkJi6JLlAXKvJSnJYRCN0+IXZAQkTo/yQfRccfqjeV0qsCeaNiC1O6jpQfqQGF+FRbfaEXy9kB6EVQrD0kaTP01ZEvJp/kK5hIxGNk8alnAgtJbl9zUyM3hD0W0k8/oatVwoE9pJ1pYei8+x2WIezBbEVVhVKzsXwoz03wqAR8SyMDDIWtvzIq/NWAETTIbALNWg3jKah2U2lX6pi+GHxB2CSyKV6IDt01TLDH8oMF35NVhDKq+CuUMyH47w38aIha3w0OppHBYBlcFqg+kQqMnzkj/fnNuGVB+3qcwI7oH+qIutJMPazWSI1An9Xla2BdsViwe1vuCHIiVfmBv9Ep3aP8qFlluRDJ8MlkBneBBoLImZXIP1hJv/MWkVLFRDhiCTIXAd4DTghHoISy1Pd1m3fJb4bXH1S2o9hw/s913dlLGWdDFYwmV1Nhi3YD3RhqCN81hsEiBQN8JLsRtIUYIrOw/KweG+MinfAYvlGVoqMQsLfHh4+bRkpnQMFQ7srG7AeiI/ZY8ZhpTZcAAGIO4ZSXDqLhKGn0NjikYwhPtMYrTBUs2/qNUIMg4qI7VIREiV9dtgCYpm0/Z+WI/np6zgCU4dcQ5nSHXocviceaIDwapF7B0a7J8ZgNZkZc/gkVba0E17HVbNrC+dKXc4LJHUz6G4DeuJbjMPfFkXU5sCZz4YrvsEEH1M1lmKbLkZdwDnyh1pByyllbCyeipemqvigak6GqnDApb1hJsPtUZ53aYYDKlAMn2mbibCaacl9dF0HnO1oTQlajbSZx0xmkjdG66krLvex2aeJS/UG9dXhc0dsJ5w84cPsbeo4I2FvCNFV9EXRUvbELlWnmbduA1/DZbq0LA9Jj6esGUMKlk7xrR2hENmUmqNhqjtRM/oHlhPuPmDF+Gou+eBRdz6VlTzsGSKyEKp/Dj6daS/MccuJRMnmYaaeZae9lE3xwv7+2A90YbgxXpXl3PIqrI+j0uee2BJfzwwWMIuGj3/jsiPc2YZsnbQHo+bGbxM1bQXC5gfY8Z7L6wn8tOwh5ScxEQUFS1MOCuzLCvBgTRtD+/fUpyzl56FVekrVVaihVPUa8YmacrmmbLGzDROeedwqZ+/F9aT2fwgtgLcqRPtNlXafkCnUdZ+FyxxnL+shFW3ivt4LDZeZ7ikWn+XgIl18VX7KI7k8yfNeCWsaMZjKD3abYbGiGpY8Xcc6DxVkdNoS7gXlmr2sHGUaQVJ07Vt18hmKIMlUVD/jnCqYo9oEcsDwUBGqCtjALXx47YoJinOiNZjbh4eOGiWD/2HjpY8qtcAcX/4NayTuZS5FrykqarH8tx2tfGKHFKTsyhBo5loV53VY5aVG2keXRKw0k2pN7vQJpQ5WJKN3OQzVeTRtlaqXBziNw7b3wXjZ5F5N9Zw85PXJPnzRP1YNGrLGBeVnmV0XJbOsmWPRg9QOctxL1WxisTyZSVvoyVtqDcOX2f1YLd5/IoMAldg5o5o+hrNFMppdCuRcCHKRvF0HyXdJDgKlUj6OeX0JzVmotyFsdHz2WRH6oFu82hcls4kqb507W1lCy3uXSadE7524zGSfzSeccVnPXChSDM9+qYAt6RE/06jD5DU+gBY61ooP3xFD8DSQcibaTx4vmJZkHvHST5My0YUDVUSj8IoQn1dxnmSVKemi/DoRzg9knN5XJ558wid6djmCO0xo9/KjsUoSUBRnVVJkp9qSxVr0y9Zgc/SHriAmVc93H61P8CbzKfwMH08XjU/ASmt5euIvvBmzYboOe2UbWw+gG1sX4w9P1tDv4WlpQ6saxyTGwS01DulnfG28p70S1jwXIwHJPafwljwiqmF8eOn0YPW/ei3sOA5LyTNZteYJS1livmD3xcvai39Fhb7/3J1U5mBmD8bj5saGDb7NKwH8njV+m70FyoilbbM5u9/Xb+HJV4iGHeNUToIhi9ay+p6AFb40dXn3hL+ESrOdXejgv/LegCWd/hnT5R89Vxsn3oEFrSXXz3vl+ghWGQrvnreL9GDsA7eqyf+Cj0Ii2juUe+O9Tgs79+r5765noD1fm7+CVjvR+sZWJ738erpb6vnYHnvFRSfZPVeKcSzluUd3iiFeBoWqRTfxs0/D+uNguICsEhQfBNai8B6l6C4DKs3CYrLwPLeo65eDJb3BkFxOVhvEBSXg/UGtBaEtf+6elFYew+Ki8KC/4Tx6gWtqWVheftOIRaHtee6enFYew6Ky8PacVBcA9Zu6+pVWO01KK4Cy9tpUFwL1i6D4lqwdhkUV4O1R1rrwdrhS1xrwtpdUFwTlre3oLgyrH3RWhvWrlKItWHtKiiuDmtPdfUGsPZTV2/BajcpxBawdvMS1zawdhIUN4K1j6C4Faxd0NoM1h7q6g1h/f3n1RvC8v58pbgtrD/+EtfGsP62m98Y1t+mtTWsP11Xbw/rD1eK/wH00Ll9w8XKCgAAAABJRU5ErkJggg=="
            return {...state, cardPacks: state.cardPacks.map(pack=>pack._id===action.id?{...pack, deckCover:cover}:pack)}
        }
        default:
            return state;
    }
}

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
    ;