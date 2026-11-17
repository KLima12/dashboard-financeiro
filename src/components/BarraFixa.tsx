import { useFinanceiroContext } from "../context/FinanceiroContext"
import { formatarMoeda } from "../utils/formatarMoeda";

export function BarraFixa(){ 
    const {dados, loading, erro, recarregar} = useFinanceiroContext()
    
    if (loading) { 
        return ( 
            <header className="barra-fixa">
                <p>Carregando...</p>
            </header>
        );
    }

    if (erro) { 
        return ( 
            <header className="barra-fixa barra-erro">
                <p>Não foi possivel carregar o seu resumo financeiro.</p>
                <button onClick={recarregar}>Tentar novamente</button>
            </header>
        );
    }

    
    return ( 
        <header className="barra-fixa">  
            <span>Saldo: {formatarMoeda(dados?.saldo)}</span>
            <span>Receitas: {formatarMoeda(dados?.receitas)}</span>
            <span>Despesas: {formatarMoeda(dados?.despesas)}</span>
            <p>teste</p>
             
            
        </header>
    )
}