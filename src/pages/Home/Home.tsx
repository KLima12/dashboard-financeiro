import { SummaryCard } from "../../components/SummaryCard";
import { useFinanceiro } from "../../hooks/useFinanceiro";
import Skeleton from "react-loading-skeleton";
import { formatarMoeda } from "../../utils/formatarMoeda";
import { NavLink } from "react-router-dom";
export const Home = () => {
  const { dados, loading, erro } = useFinanceiro();

  if (loading) {
    return (
      <div className="cards-resumo">
        <Skeleton width={250} height={120} />
        <Skeleton width={250} height={120} />
        <Skeleton width={250} height={120} />
      </div>
    );
  }

  /*if (erro) {
    return (
      <div className="erro-container">
        <p>Não foi possível carregar os dados financeiros</p>
      </div>
    );
  }*/

  return (
    <div className="home-container">
      <header className="header">
        <h1>Olá, bem vindo: </h1>
        <NavLink to="/cadastrar-transacao" className="links-page">
          Cadastre uma transação
        </NavLink>
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
  );
};
