interface SummaryCardProps { 
    titulo: string;
    valor: string;
    tipo?: "saldo" | "receita" | "despesa";
}

export const SummaryCard = ({titulo, valor, tipo}: SummaryCardProps) => { 
    return ( 
        <div className={`card-financeiro card-${tipo}`}>
            <span className="card-titulo">{titulo}: </span>
            <strong>{valor}</strong>
        </div>
    )
}