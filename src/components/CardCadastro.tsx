import type { TransactionType } from "../shared/services/api/TransacoesApi";
import { formatarMoeda } from "../utils/formatarMoeda";

interface CardCadastroProps { 
    id: number;
    categoria: string;
    descricao: string | null;
    valor: string;
    tipo: TransactionType; 
    data: string;
    created_at: string; 
    updated_at: string;
    onEdit(): void;
    onRemove(): void;
}

export const CardCadastro = ({id, categoria, descricao, valor, tipo, data, created_at, updated_at, onEdit, onRemove}: CardCadastroProps) => { 
    return (
        <div className="lista-cards">
            <div key={id} className="card-transacao">
                <span className="valor">Valor: {formatarMoeda(valor)}</span>
                <span className="categoria">Categoria: {categoria}</span>
                <span className="descricao">Descricão: {descricao}</span>
                <span className="tipo">Tipo: {tipo}</span>
                <span className="data">Data: {data}</span>
                <span className="created_at">Criado em: {created_at}</span>
                <span className="updated_at">Atualizado em: {updated_at}</span>

                <button className="btn-edit" onClick={onEdit}>Editar: </button>
                <button className="btn-create" onClick={onRemove}>Remover: </button>
                
            </div>
    </div>   
    )
    
}