import { useEgresos } from "../Context/EgresosContext";
import { useIngresos } from "../Context/IngresosContext";
import PorDia from "../components/PorDia";

import { useEffect } from "react";
import VentasPorDia from "../components/VentasPorDia";
import { useVentas } from "../Context/VentasContext";
import ProductoPorDia from "../components/ProductoPorDia";
import GraficaVentas from "../components/GraficaVentas"; 



function ResumenGeneral({ data, tipo, dataVenta }) {
  const { getIngresos, ingresos } = useIngresos();
  const { getEgresos, egresos} = useEgresos();
  const {venta, getVentas}= useVentas();

  useEffect(() => {
    getIngresos();
    getEgresos();
    getVentas();
  }, []);

  //if (ingresos.length === 0) return <h1>No hay Ingresos disponibles</h1>; 
  //if(egresos.length === 0) return(<h1>No hay egresos disponibles</h1>)

  return (
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Resumen General</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Ingresos Totales por Dia</h3>
              {/* Agrega el valor de ingresos totales aquí */}
              <PorDia data={ingresos} tipo={"ingresos"}  />
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Egresos Totales por Dia</h3>
              {/* Agrega el valor de egresos totales aquí */}
              <PorDia data={egresos} tipo={"egresos"}/>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Ventas por Dia</h3>
              {/* ventas */}
              <VentasPorDia data={venta}/>
              
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Producto Más Vendido Hoy</h3>
              {/* Muestra una lista de productos más vendidos aquí */}
              <ProductoPorDia data={venta}/>
            </div>
          </div>
        </div>
       <div className="p-20">
        <GraficaVentas dataVenta={venta}/>
       </div>
        </div>
        
      );
}

export default ResumenGeneral