import React from 'react'
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

function PorDia({data, tipo }) {
    const ingresoTotalPorDia = {}; 
    // Objeto para almacenar el monto total por día
//const ingresoTotalPorDia = {};

data.forEach((registro) => {
    const fecha = new Date(registro.fecha).toLocaleDateString();
    const monto = parseFloat(registro.cantidad);
  
    if (!isNaN(monto)) {
      if (!ingresoTotalPorDia[fecha]) {
        ingresoTotalPorDia[fecha] = 0;
      }
      ingresoTotalPorDia[fecha] += monto;
    }
  });
  
  console.log("Monto total por día:", ingresoTotalPorDia);
  const fechaHoy = new Date().toLocaleDateString();
    const ingresoHoy = ingresoTotalPorDia[fechaHoy];
  
    if (typeof ingresoHoy !== "undefined") {
      console.log("total hoy:", ingresoHoy);
    } else {
      console.log("Aún no hay ingresos o egresos hoy");
    }
  
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
  <div className="flex items-center justify-between">
    <div className="text-xl font-semibold text-blue-800">
      <div className='flex items-center'>
      {tipo === 'ingresos' ? (
        <AiOutlineCheck style={{ color: 'green' }} />
      ) : (
        <AiOutlineClose style={{ color: 'red' }} />
      )}
      <p className="text-xl font-semibold text-blue-800 pl-4">
        {tipo === 'ingresos' ? 'Ingresos' : 'Egresos'}
      </p>
      </div>
      <p className="text-sm text-blue-600">Fecha: {fechaHoy}</p>
    </div>
    <span className='text-lg font-semibold text-blue-800 pr-4'>Monto total:   
    <span className="text-lg font-semibold text-black p-4"> 
    {ingresoHoy !== undefined ? `${ingresoHoy} MXN` : '0 MXN'}</span></span> 
  </div>
</div>



  )
}

export default PorDia