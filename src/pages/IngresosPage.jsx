import { useEffect } from "react";
import { useIngresos } from "../Context/IngresosContext";
import Tabla from "../components/Tabla";
import ReportePDF from "../components/ReportePDF";
import BuscadorReporte from "../components/BuscadorReporte";

function IngresosPage() {
  const { getIngresos, ingresos, getIngresosByFecha } = useIngresos();

  useEffect(() => {
    getIngresos();
  }, []);

  const handleSearch = (fecha) => {
    getIngresosByFecha(fecha);
  };

  //if (ingresos.length === 0) return <h1>No hay Ingresos disponibles</h1>;
  //console.log(ingresos)

  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-3 md:mt-0">Ingresos</h1>
      <div className="flex">
        <BuscadorReporte onSearch={handleSearch} />
        <ReportePDF data={ingresos}></ReportePDF>
      </div>
      <Tabla data={ingresos} tipo={"Ingresos"}></Tabla>
    </div>
  );
}

export default IngresosPage;
