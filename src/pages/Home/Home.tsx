import { SummaryCard } from "../../components/SummaryCard";
import { useFinanceiro } from "../../hooks/useFinanceiro";
import Skeleton from "react-loading-skeleton";

export const Home = () => { 
    const {dados, loading, erro} = useFinanceiro();

    if (loading) { 
        return ( 
            <div className="cards-resumo"> 
                <Skeleton width={250} height={120} />
                <Skeleton width={250} height={120} />
                <Skeleton width={250} height={120} />
            </div>
        );
    }

    if (erro) { 
        return ( 
            <div className="erro-container">
                <p>Não foi possível carregar os dados financeiros</p>
            </div>
        );
    }
    const formatarMoeda = (valor?: string | number) => { 
        return Number(valor ?? 0).toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL'
        });
    };

    return ( 
            <div className="home-container">
                <header className="header"> 
                    <h1>Olá, bem vindo: </h1>
                </header>

                <main className="main">
                    <SummaryCard 
                        titulo="Saldo Atual"
                        valor={formatarMoeda(dados?.saldo)}
                        tipo="saldo"
                    />

                    <SummaryCard 
                        titulo="Despesas"
                        valor={formatarMoeda(dados?.despesas)}
                        tipo="despesa"
                    />

                    <SummaryCard 
                        titulo="Receitas"
                        valor={formatarMoeda(dados?.receitas)}
                        tipo="receita"
                    />
                </main>
            </div>
       
    )
}