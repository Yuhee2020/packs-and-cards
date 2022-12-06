export type PostCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}

export type GetCardsParamsType = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
}

export type GetCardsResponseType = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover?: any;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    type: string
    shots: number
    rating: number
    user_id: string
    created: string
    updated: string
    _id: string
    questionImg?:string
    answerImg?:string

}
