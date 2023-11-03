import React, { useState } from "react";
import ResultadosBusqueda from "../components/ResultadosBusqueda";
import { useIngresos } from "../Context/IngresosContext";
import BuscadorEntreFechas from "../components/BuscadorEntreFechas";

function EstadisticosPage() {
  const [resultados, setResultados] = useState([]);
  
  const{getIngresosEntreFechas, ingresos}= useIngresos()
  let total =0 
  ingresos.map((ingreso)=>(
    total += ingreso.cantidad
  ))

  const handleSearch = (fechas) => {
    getIngresosEntreFechas(fechas)
  };
  return (
    <div className="App">
      <h1>Buscador de Ingresos</h1>
      <BuscadorEntreFechas onSearch={handleSearch} />
      <h1>{total}</h1>
      <ResultadosBusqueda resultadosEncontrados={ingresos}/>
    </div>
  );
}

export default EstadisticosPage;
