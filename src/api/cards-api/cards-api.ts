import {instance} from "../instance";
import {GetCardsParamsType, GetCardsResponseType, PostCardType, UpdateCardType} from "./cardsTypes";



export const cardsAPI = {

    getCards(params: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>("cards/card", {params})
    },
    postCard(card: PostCardType) {
        return instance.post("cards/card", {card})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCard(card: UpdateCardType) {
        return instance.put("cards/card", {card})
    },
    updateCardGrade(grade: number, card_id: string){
        return instance.put('cards/grade', {grade, card_id})
    }
}


