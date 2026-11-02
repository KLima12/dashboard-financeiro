import { useState } from "react"
import { SummaryCard } from "../../components/SummaryCard";

export interface DashboardFinanceiro{ 
    saldo: number, 
    receitas: number, 
    despesas: number
}
export const Home = () => { 

    const [summary, setSummary] = useState<DashboardFinanceiro>({
        saldo: 0, 
        receitas: 0, 
        despesas: 0
    });
    return ( 
            <div className="home-container">
                <header className="header"> 
                    <h1>Olá, bem vindo: </h1>
                </header>

                <main className="main">
                    <SummaryCard 
                        titulo="Saldo Atual"
                        valor={summary.saldo}
                        tipo="saldo"
                    />

                    <SummaryCard 
                        titulo="Despesas"
                        valor={summary.despesas}
                        tipo="despesa"
                    />

                    <SummaryCard 
                        titulo="Total Receitas"
                        valor={summary.receitas}
                        tipo="receita"
                    />
                </main>
            </div>
       
    )
}