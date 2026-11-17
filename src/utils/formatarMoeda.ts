export const formatarMoeda = (valor?: string | Number) => { 
        return Number(valor ?? 0).toLocaleString("pt-BR", { 
            style: "currency", 
            currency: "BRL"
        });
    }