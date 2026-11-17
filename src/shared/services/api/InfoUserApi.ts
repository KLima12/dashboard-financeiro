import { api } from "../../api/api";
export interface IInfouser { 
    saldo: string;
    despesas: string;
    receitas: string;
    
}


export const InfoUserApi = { 
    async getAll(signal?: AbortSignal) { 
            const response = await api.get("/financeiro/get_dados/", {signal}); 

            return response.data as IInfouser;
    }
}