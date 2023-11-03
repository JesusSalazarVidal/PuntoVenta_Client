import { useEffect } from "react";
import { useEgresos } from "../Context/EgresosContext";
import Tabla from '../components/Tabla'
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import ReportePDF from "../components/ReportePDF";
import BuscadorReporte from "../components/BuscadorReporte";

function EgresosPage() {
  const { getEgresos, egresos, getEgresosByFecha} = useEgresos();


  useEffect(() => {
    getEgresos();
  }, []);

  const handleSearch = (fecha) => {
    getEgresosByFecha(fecha);
  };

  //if(egresos.length === 0) return(<h1>No hay egresos disponibles</h1>)

  return (
    <div>
    <h1 className="text-3xl font-bold text-center p-3 md:mt-0">Egresos</h1>
    <div className="flex">
      <BuscadorReporte onSearch={handleSearch} />
      <ReportePDF data={egresos} />
    </div>
    <Tabla data={egresos} tipo={'Egresos'} />
  </div>
  );
}

export default EgresosPage;
