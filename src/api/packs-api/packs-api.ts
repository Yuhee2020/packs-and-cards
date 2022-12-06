import {AxiosResponse} from "axios";
import {instance} from "../instance";
import {CreatePackDataType, GetPacksParamsType, GetPacksResponseType, UpdatePackDataType} from "./packsTypes";





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


