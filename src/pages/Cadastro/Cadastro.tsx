import React, { useEffect, useState } from "react"
import { useFinanceiroContext } from "../../context/FinanceiroContext";
import { TransacoesApi } from "../../shared/services/api/TransacoesApi";
import { type Ifinanceiro } from "../../shared/services/api/TransacoesApi";
import { CardCadastro } from "../../components/CardCadastro";
type Mode = "view" | "edit" | "create";

interface ITipo { 
    nomeBackend: string; 
    nomeFrontEnd: string;
}

interface Categoria { 
    id: number; 
    nome: string;
}

const TipoArray: ITipo[] = [ 
    {nomeBackend: "INCOME", nomeFrontEnd: "Receita"}, 
    {nomeBackend: "EXPENSE", nomeFrontEnd: "Despesa"},
]

const listaCategorias: Categoria[] = [ 
    {id: 1, nome: "Alimentação"}, 
    {id: 2, nome: "Moradia"}, 
    {id: 3, nome: "Transporte"}, 
    {id: 4, nome: "Saúde"}, 
    {id: 5, nome: "Lazer"}, 
    {id: 6, nome: "Outros"} 
]

export const Cadastro = () => { 
    const {recarregar: atualizarBarraTopo} = useFinanceiroContext();
    
    const [transacao, setTransacao] = useState<Ifinanceiro[] | null>([]);
    const [formValues, setFormValues] = useState({
        id: "",
        valor: "", 
        descricao: "", 
        tipo: "", 
        categoria: "", 
        data: "", 
    });
    const [mode, setMode] = useState<Mode>("view");
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => { 
        const getTransaction = async () => { 
            try { 
                setLoading(true);
                setError(null); 
                const response = await TransacoesApi.getTransacoes();
                if (response) {
                    setTransacao(response);
                    setMode("view");
                }
            } catch(e) { 
                // TODO verificar dps
                console.error("Houve um erro ao pegar seu histórico de transações.", error);
            }
            finally { 
                setLoading(false);
            }
        };
        getTransaction();
    }, [])

    const handleCreate = () => { 
        if (transacao) { 
            setMode("create");
            // Abrir formValues
            setFormValues({ 
                id: "",
                valor: "", 
                descricao: "", 
                tipo: "", 
                categoria: "", 
                data: ""
            });
        }
    }
    const handleEdit = () => { 
        if (transacao) { 
            setMode("edit");
            setFormValues({
                id: transacao.id || "",
                valor: transacao?.valor || "", 
                descricao: transacao?.descricao || "", 
                tipo: transacao?.tipo || "",  
                categoria: transacao?.categoria || "", 
                data: transacao?.data || "",
            })
        }
    }

    const handleCancel = () => { 
        if (transacao) { 
            setFormValues({
                id: "", 
                valor: "", 
                descricao: "", 
                tipo: "", 
                categoria: "", 
                data: ""
            });
            setMode("view");
        } else { 
            setMode("view");
        }
    }

    const handleCancelCreate = () => { 
        handleCancel();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
        const {name, value} = e.target;

        setFormValues((prev) => ({
            ...prev, 
            [name]: value,
        }))
    }

    const handleSave = (e: ) => { 
        e.target.value();

        
    }

    const editarTransacao = () => { 

    }

    const removerTransacao = () => { 

    }

    

    return (
        <div className="main-cadastro">
            <h2>Criar Transação</h2>
            <div className="cadastro-transacao">
                <form className="create-transacao" onSubmit={handleSave}>
                    <select name="tipo" id="tipo" value={formValues.tipo} className="selects" onChange={handleChange} required>
                        {TipoArray.map((t) => ( 
                            <option key={t.nomeBackend} value={t.nomeBackend}>{t.nomeFrontEnd}</option>
                        ))}
                    </select>
                    
                    <input name="valor" className="input-valor" type="number" value={formValues.valor} required/>
                    
                    <input name="descricao" className="input-descricao" type="text" maxLength={120} value={formValues.descricao} />
                    
                    <select name="categoria" id="categoria" value={formValues.categoria} className="selects" onChange={handleChange} required>
                        {listaCategorias.map((c) => ( 
                            <option key={c.id} value={c.nome}>{c.nome}</option>
                        ))}
                    </select>

                    <input className="input-data" name="data" value={formValues.data} onChange={handleChange} required />

                    <button className="btn-salvar">Salvar Transação</button>
                </form>
            </div>

            <div className="historico-transacoes">
                <h2>Histórico de Transações</h2>
                {transacao?.map((transacoes) => ( 
                    <CardCadastro 
                        id={transacoes?.id} 
                        valor={transacoes?.valor} 
                        tipo={transacoes?.tipo} 
                        categoria={transacoes?.categoria}
                        descricao={transacoes?.categoria}
                        data={transacoes?.data}
                        created_at={transacoes?.created_at}
                        updated_at={transacoes?.updated_at}
                        onEdit={editarTransacao}
                        onRemove={removerTransacao}
                    />
                ))}
            </div>
        </div>
    )
}