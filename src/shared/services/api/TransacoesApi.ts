import { api } from "../../api/api";

export type TransactionType = "receitas" | "despesas";

export interface Ifinanceiro { 
    id: number;
    categoria: string;
    descricao: string | null;
    valor: string;
    tipo: TransactionType; 
    data: string;
    created_at: string; 
    updated_at: string;
}

export const TransacoesApi = { 
    async getTransacoes() { 
        try { 
            const response = await api.get("/financeiro/get-transacoes/");

            return response.data as Ifinanceiro[];
        } catch(e) { 
            console.error("Erro ao buscar histórico de transações do usuário.")
        }
    },

    async editTransacao(
        id: number, 
        tipo: string, 
        valor: string, 
        categoria: string, 
        descricao: string, 
        data: string) { 
        try { 
            const response = await api.put(`/financeiro/edit-transacao/${id}`, { 
                tipo: tipo, 
                valor: valor, 
                categoria: categoria, 
                descricao: descricao, 
                data: data
            })

            return response.data;
        } catch(error) { 
            console.log("Erro ao editar transacao: ", error);
            alert("Houve um erro ao editar sua transação. Tente novamente.");
        }
    }
}