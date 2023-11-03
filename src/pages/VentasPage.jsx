import { useEffect } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useVentas } from "../Context/VentasContext";
import TablaVentas from "../components/TablaVentas2";
import SidebarMenu from "../components/SidebarMenu";
import BuscadorReporte from "../components/BuscadorReporte";
import ReportePDF from "../components/ReportePDF";

function VentasPage() {
    const {venta, getVentas, getVentasByFecha}= useVentas()

    useEffect(()=>{
        getVentas();
    }, []);
    //console.log(venta)

    const handleSearch = (fecha) => {
      console.log(fecha)
      getVentasByFecha(fecha);
    };
  

    if(venta.length === 0) return(<h1>No hay ventas registradas</h1>)
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center mr-32">Ventas</h1>
      <div className="flex">
        <BuscadorReporte onSearch={handleSearch} />
      </div>
      <TablaVentas data={venta}></TablaVentas>
    </div>
  )
}

export default VentasPage