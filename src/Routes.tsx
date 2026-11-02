import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";

export const AppRoutes = () => { 
    
    return (
        <BrowserRouter> 
        <Routes> 
            <Route path="/" element={<Home />} />
            {/*<Route path="/cadastrar-transacao" element={}*/}
            {/*Historico de transações*/}
            <Route path="*" element={<Navigate to="/" />} />
            
        </Routes>
    </BrowserRouter>
    )
}