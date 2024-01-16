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
import { AuthProvider } from "./context/AuthProvider";
import { ClientProvider } from "./context/ClientesProvider";
import ClientInfo from "./pages/clientes/ClientInfo";
import EventInfo from "./pages/events/EventInfo";
import "mapbox-gl/dist/mapbox-gl.css";
import FormInventario from "./components/inventario/FormInventario";
import FormContrato from "./components/contratos/FormContrato";
import ServicioNuevo from "./pages/servicios/ServicioNuevo";
import Register from "./auth/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register/:id" element={<Register />} />

            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="/app/events/:id" element={<EventInfo />} />
              {/* Clientes */}
              <Route path="/app/clientes" element={<Clientes />} />
              <Route path="/app/clientes/:id" element={<ClientInfo />} />

              {/* Inventario */}
              <Route path="/app/inventario" element={<Inventario />} />
              <Route path="/app/inventario/new" element={<FormInventario />} />
              <Route path="/app/inventario/:id" element={<FormInventario />} />

              {/* Contratos */}
              <Route path="/app/contratos" element={<Contratos />} />
              <Route path="/app/contratos/new" element={<FormContrato />} />

              {/* Servicios */}
              <Route path="/app/servicios" element={<Servicios />} />
              <Route path="/app/servicios/new" element={<ServicioNuevo />} />

              <Route path="/app/inspeccion" element={<Inspeccion />} />
              <Route path="/app/ajustes" element={<Ajustes />} />
            </Route>
          </Routes>
        </ClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
