import React, { useEffect, useState } from "react";
import { useFinanceiroContext } from "../../context/FinanceiroContext";
import { TransacoesApi } from "../../shared/services/api/TransacoesApi";
import { type Ifinanceiro } from "../../shared/services/api/TransacoesApi";
import { CardCadastro } from "../../components/CardCadastro";

interface ITipo {
  nomeBackend: string;
  nomeFrontEnd: string;
}

interface Categoria {
  id: number;
  nome: string;
}

interface FormValues {
  valor: number | "";
  descricao: string;
  tipo: string;
  categoria: string;
  data: string;
}

const obterDataHoje = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
};

const dataBackend = (data: string) => {
  const [dia, mes, ano] = data.split("/");

  return `${ano}-${mes}-${dia}`;
};
const TipoArray: ITipo[] = [
  { nomeBackend: "INCOME", nomeFrontEnd: "Receita" },
  { nomeBackend: "EXPENSE", nomeFrontEnd: "Despesa" },
];

const listaCategorias: Categoria[] = [
  { id: 1, nome: "Alimentação" },
  { id: 2, nome: "Moradia" },
  { id: 3, nome: "Transporte" },
  { id: 4, nome: "Saúde" },
  { id: 5, nome: "Lazer" },
  { id: 6, nome: "Outros" },
];

export const Cadastro = () => {
  const { recarregar: atualizarBarraTopo } = useFinanceiroContext();

  const [transacao, setTransacao] = useState<Ifinanceiro[] | null>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    valor: "",
    descricao: "",
    tipo: "",
    categoria: "",
    data: obterDataHoje(),
  });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await TransacoesApi.getTransacoes();
        if (response) {
          setTransacao(response);
          atualizarBarraTopo();
        }
      } catch (e) {
        // TODO verificar dps
        console.error(
          "Houve um erro ao pegar seu histórico de transações.",
          error,
        );
      } finally {
        setLoading(false);
      }
    };
    getTransaction();
  }, []);

  const handleEdit = (item: Ifinanceiro) => {
    setIsEditing(true);
    setFormValues({
      valor: item?.valor ? Number(item.valor) : "",
      descricao: item?.descricao || "",
      tipo: item?.tipo || "",
      categoria: item?.categoria || "",
      data: item?.data || "",
    });

    setEditingId(item.id);
  };

  const handleCancel = () => {
    if (editingId) {
      // Se eu clicar em cancelar no handleCancel, ele fecha a edição.
      setIsEditing(false);
      // Fica null.
      setEditingId(null);
    }
    setFormValues({
      valor: "",
      descricao: "",
      tipo: "",
      categoria: "",
      data: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemove = async (id: number) => {
    try {
      const response = await TransacoesApi.deleteTransacao(id);
      if (response) {
        setTransacao(response);

        atualizarBarraTopo();
      }
    } catch (error) {
      setError("Erro ao atualizar transação");
      console.error("Houve um erro ao atualizar sua transação: ", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const valorParaBackend = Number(formValues.valor || 0).toFixed(2);
    const dataFormatado = dataBackend(formValues.data);
    try {
      setIsSaving(true);
      if (editingId) {
        const response = await TransacoesApi.editTransacao(
          editingId,
          formValues.tipo,
          valorParaBackend,
          formValues.categoria,
          formValues.descricao,
          dataFormatado,
        );

        if (response) {
          // Atualizando o setTransacao
          setTransacao(response);
          // Atualizando barra do topo para mostrar os novos valores.
          atualizarBarraTopo();
        }
      } else {
        const response = await TransacoesApi.createTransacao(
          formValues.tipo,
          valorParaBackend,
          dataFormatado,
          formValues.categoria,
          formValues.descricao,
        );

        if (response) {
          setTransacao(response);
          atualizarBarraTopo();
        }
      }
    } catch (e) {
      setError("Houve um erro ao pegar ao salvar sua transação. ");
      console.error("Error ao salvar transação: ", e);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    <form className="edit-transacao" onSubmit={handleSave}>
      <select
        name="tipo"
        id="tipo"
        value={formValues.tipo}
        className="selects"
        onChange={handleChange}
        required
      >
        {TipoArray.map((t) => (
          <option key={t.nomeBackend} value={t.nomeBackend}>
            {t.nomeFrontEnd}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="valor"
        className="input-valor"
        value={formValues.valor}
        onChange={handleChange}
        required
      />
      <input
        name="descricao"
        className="input-descricao"
        type="text"
        maxLength={120}
        onChange={handleChange}
        value={formValues.descricao}
      />
      <select
        name="categoria"
        id="categoria"
        value={formValues.categoria}
        className="selects"
        onChange={handleChange}
        required
      >
        {listaCategorias.map((c) => (
          <option key={c.id} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </select>
      <input
        className="input-data"
        type="date"
        name="data"
        value={formValues.data}
        onChange={handleChange}
        required
      />
      <button type="button" className="btn-salvar" disabled={isSaving}>
        {isSaving ? "Editando..." : "Editar"}
      </button>

      <button
        type="button"
        onClick={() => handleCancel()}
        className="cancel-edit"
      >
        Cancelar
      </button>
    </form>;
  }

  return (
    <div className="main-cadastro">
      <h2>Criar Transação</h2>
      <div className="cadastro-transacao">
        <form className="create-transacao" onSubmit={handleSave}>
          <p>
            <strong>Tipo: </strong>
          </p>
          <select
            name="tipo"
            id="tipo"
            value={formValues.tipo}
            className="selects"
            onChange={handleChange}
            required
          >
            {TipoArray.map((t) => (
              <option key={t.nomeBackend} value={t.nomeBackend}>
                {t.nomeFrontEnd}
              </option>
            ))}
          </select>

          <p>
            <strong>Valor: </strong>
          </p>
          <input
            type="number"
            name="valor"
            className="input-valor"
            value={formValues.valor}
            onChange={handleChange}
            required
          />

          <p>
            <strong>Descrição: </strong>
          </p>

          <input
            name="descricao"
            className="input-descricao"
            type="text"
            maxLength={120}
            value={formValues.descricao}
            onChange={handleChange}
          />

          <p>
            <strong>Categoria: </strong>
          </p>
          <select
            name="categoria"
            id="categoria"
            value={formValues.categoria}
            className="selects"
            onChange={handleChange}
            required
          >
            {listaCategorias.map((c) => (
              <option key={c.id} value={c.nome}>
                {c.nome}
              </option>
            ))}
          </select>
          <p>
            <strong>Data: </strong>
          </p>
          <input
            className="input-data"
            type="date"
            name="data"
            value={formValues.data}
            onChange={handleChange}
            required
          />

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
            descricao={transacoes?.descricao}
            data={transacoes?.data}
            created_at={transacoes?.created_at}
            updated_at={transacoes?.updated_at}
            onEdit={() => handleEdit(transacoes)}
            onRemove={() => handleRemove(transacoes.id)}
          />
        ))}
      </div>
    </div>
  );
};
