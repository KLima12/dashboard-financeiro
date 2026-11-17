import { useState, useEffect, useCallback } from 'react'
import { InfoUserApi } from '../shared/services/api/InfoUserApi';
import { type IInfouser } from '../shared/services/api/InfoUserApi';
export function useFinanceiro() { 
    const [dados, setDados] = useState<IInfouser | null>(null); 
    const [loading, setLoading] = useState(true); 
    const [erro, setErro] = useState<Error | null>(null);

    const carregar = useCallback(async (signal?: AbortSignal) => { 
         
        try { 
            setLoading(true);
            const data = await InfoUserApi.getAll(signal); 
            setDados(data);
            setErro(null);

        } catch (e) {
            if (e instanceof Error && (e.name === 'CanceledError' || e.name === 'AbortError')) return
            setErro(e instanceof Error ? e : new Error(String(e)))
        }
        finally { 
            setLoading(false);
        }
    }, [])
    
    useEffect(() => { 
        const controller = new AbortController();
        carregar(controller.signal);
        return () => controller.abort();
    }, [carregar])

    // Refresh manual (ex: Após criar transação)
    const recarregar = useCallback(() => carregar(), [carregar])

    return {dados, loading, erro, recarregar}

    }