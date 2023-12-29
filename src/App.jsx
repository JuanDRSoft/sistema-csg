import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Servicios from "./pages/Servicios";
import Contratos from "./pages/Contratos";
import Inventario from "./pages/Inventario";
import Inspeccion from "./pages/Inspeccion";
import Ajustes from "./pages/Ajustes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="/app/clientes" element={<Clientes />} />
          <Route path="/app/servicios" element={<Servicios />} />
          <Route path="/app/contratos" element={<Contratos />} />
          <Route path="/app/inventario" element={<Inventario />} />
          <Route path="/app/inspeccion" element={<Inspeccion />} />
          <Route path="/app/ajustes" element={<Ajustes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
