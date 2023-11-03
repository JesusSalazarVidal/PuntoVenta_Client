import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProductProvider } from "./Context/ProductContext";
import { VentaProvider } from "./Context/VentasContext";
import { EgresoProvider } from "./Context/EgresosContext";
import { UsuarioProvider } from "./Context/UsuariosContext";
import { IngresoProvider } from "./Context/IngresosContext";

import Navbar from "./components/Navbar";
import SidebarMenu from "./components/SidebarMenu";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import IngresosPage from "./pages/IngresosPage";
import EgresosPage from "./pages/EgresosPage";
import VentaPage from "./pages/VentaPage";
import VentaFormPage from "./pages/VentaFormPage";
import IngresosFormPage from "./pages/IngresosFormPage";
import ProductPageForm from "./pages/ProductPageForm";
import ProductPage from "./pages/ProductPage";
import ModalEditarProducto from "./components/ModalEditarProducto";

import ProtectedRoute from "./ProtectedRoute";
import EgresoFormPage from "./pages/EgresoFormPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioEditar from "./pages/UsuarioEditar";
import VentasPage from "./pages/VentasPage";

import TablaVentas from "./components/TablaVentas";
import ProtectedAdmin from "./ProtectedAdmin";
import EstadisticosPage from "./pages/EstadisticosPage";



function App() {
  return (
    <AuthProvider>
      <ProductProvider >
        <VentaProvider>
          <EgresoProvider>
            <UsuarioProvider>
              <IngresoProvider>
                <BrowserRouter>
                  <main className="container mx-auto px-5">
                    <Navbar />
                    <Routes>
                      
                      <Route path="/tablaVentas" element={<TablaVentas />} />
                      <Route path="/sidebarMenu" element={<SidebarMenu />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/index" element={<HomePage />} />

                      <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route element={<ProtectedAdmin />}>
                          <Route path="/ingresos" element={<IngresosPage />} />
                          <Route
                            path="/egresos/new"
                            element={<EgresoFormPage />}
                          />
                          <Route
                            path="/actualizarEgreso/:id"
                            element={<EgresoFormPage />}
                          />
                          <Route
                            path="/obtenerEgresos"
                            element={<EgresosPage />}
                          />
                          <Route path="/usuarios" element={<UsuariosPage />} />
                          <Route
                            path="/actualizarUsuario/:id"
                            element={<UsuarioEditar />}
                          />
                          <Route
                            path="/crearProducto"
                            element={<ProductPageForm />}
                          />
                          <Route
                            path="/obtenerProducto/:id"
                            element={<ProductPageForm />}
                          />
                          <Route
                            path="/obtenerProductos"
                            element={<ProductPage />}
                          />
                          <Route
                            path="/actualizarProducto/:id"
                            element={<ModalEditarProducto />}
                          />
                          <Route
                            path="/crearIngreso"
                            element={<IngresosFormPage />}
                          />
                          <Route
                            path="/obtenerIngresos"
                            element={<IngresosPage />}
                          />
                          <Route
                            path="/actualizarIngreso/:id"
                            element={<IngresosFormPage />}
                          />
                          <Route
                            path="/estadisticos"
                            element={<EstadisticosPage />}
                          />
                        </Route>

                        <Route path="/crearVenta" element={<VentaFormPage />} />
                        <Route
                          path="/obtenerVenta/:id"
                          element={<VentaFormPage />}
                        />
                        <Route path="/obtenerVentas" element={<VentasPage />} />
                      </Route>
                    </Routes>
                  </main>
                </BrowserRouter>
              </IngresoProvider>
            </UsuarioProvider>
          </EgresoProvider>
        </VentaProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
