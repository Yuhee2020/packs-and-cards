import {instance} from "./autumn-api";
import {AxiosResponse} from "axios";


export const packsAPI = {
    getPacks(params: GetPacksParamsType) {
        return instance.get<GetPacksParamsType, AxiosResponse<GetPacksResponseType>>('/cards/pack', {params})
    },
    ///про private пишет, что это зарезервированное слово
    createPack({cardsPack: {name = 'no Name', deckCover = 'url or base64', private_ = false}}: CreatePackDataType) {
        return instance.post<CreatePackDataType, AxiosResponse<{ newCardsPack: any }>>('/cards/pack', {
            cardsPack: {
                name,
                deckCover,
                private_
            }
        })
    },
    deletePack(id: string) {
        return instance.delete<{ id: string }, AxiosResponse<{ deletedCardsPack: any }>>(`/cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePackDataType) {
        return instance.put<UpdatePackDataType, AxiosResponse<{ updatedCardsPack: any }>>('/cards/pack', {
                cardsPack: data
            }
        )
    }
}

export type PackType = {
    _id: string
    user_id: string
    name: string
    user_name: string
    cardsCount: number
    created: string
    updated: string
    private: boolean
    deckCover?: string
}

export type UpdatePackDataType = {
    _id: string
    name: string
    private?: boolean
    deckCover?:string
}

export type CreatePackDataType = {
    cardsPack: {
        name?: string // если не отправить будет таким
        deckCover?: string // не обязателен
        private_?: boolean // если не отправить будет такой
    }
}

export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    block?: boolean
}

export type GetPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}


