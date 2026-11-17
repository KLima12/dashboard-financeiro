import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { BarraFixa } from "./components/BarraFixa";
import { FinanceiroProvider } from "./context/FinanceiroContext";

export const AppRoutes = () => { 
    // Componente de layout: a barraResumo fica fixa no topo!
    function AppLayout() { 
        return ( 
            <div className="app-container"> 
                <BarraFixa />
                <main className="conteudo-pagina">
                    <Outlet /> {/*Aqui dentro renderiza Home ou cadastro*/}
                </main>
            </div>
        )
    }
    return (
        <FinanceiroProvider>
            <BrowserRouter> 
                <Routes> 
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastrar-transacao" element={<Cadastro />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </FinanceiroProvider>
    )
}