import { useEffect, useState } from "react";
import { useVentas } from "../Context/VentasContext"
import { useProduct } from "../Context/ProductContext";
import DetalleVenta from "./DetalleVenta";
import SidebarMenu from "./SidebarMenu";
import { useAuth } from "../Context/AuthContext";

function TablaVentas() {
  const { getVentas, venta } = useVentas();
  const { getProductos } = useProduct(); 
  const { usuario } = useAuth();

  useEffect(() => {
    getVentas();
    getProductos();
    
  }, []);


  // Verificar si usuario está inicializado antes de acceder a 'nombre'
  const isAdmin = usuario && usuario.nombre === 'Administrador';


  return (
    <div>
    {isAdmin ? (
      <div>
        <SidebarMenu />
        <div className="sm:ml-64">
        <h1 className="text-lg text-center font-black p-4 mt-16">Detalles de Ventas</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          {venta.map((vent, index) => (
            <DetalleVenta vent={vent} key={index} />
          ))}
        </div>
        </div>
      </div>
    ) : (
      <div>
        <h1 className="text-lg text-center font-black p-4 mt-16">Detalles de Ventas</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          {venta.map((vent, index) => (
            <DetalleVenta vent={vent} key={index} />
          ))}
        </div>
      </div>
    )}
  </div>
  );
}

export default TablaVentas