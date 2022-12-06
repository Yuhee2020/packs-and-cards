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