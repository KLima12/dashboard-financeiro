import { createContext, useContext, type ReactNode } from "react";
import { useFinanceiro } from "../hooks/useFinanceiro";
import type { IInfouser } from "../shared/services/api/InfoUserApi";


// Aqui defino oque vai está disponivel no contexto. Quem acessar vai receber essa 4 propriedades.
interface FinanceiroContextData { 
    dados: IInfouser | null;
    loading: boolean; 
    erro: Error | null;
    recarregar: () => void;
}

const financeiroContext = createContext<FinanceiroContextData>({} as FinanceiroContextData)


export function FinanceiroProvider({ children }: {children: ReactNode}) { 
    // Aqui vai conter dados, loadingh, erro...
    const financeiro = useFinanceiro();
    {/* Todos componentes filhos que estiverem dentro do FinanceiroProvider -> Terão acesso ao value (financeiro) */}
    return ( 
        
        <financeiroContext.Provider value={financeiro}> 
            {children}
        </financeiroContext.Provider>
    )
}

export const useFinanceiroContext = () => useContext(financeiroContext);