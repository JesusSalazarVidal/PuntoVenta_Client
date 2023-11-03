import React from 'react'
import { TiChartLine } from "react-icons/ti";

function VentasPorDia({data}) {
    // Objeto para almacenar el contador de ventas por día
const ventasPorDia = {};

// Obtener la fecha actual y convertirla a un formato comparable
const fechaActual = new Date().toLocaleDateString();

// Itera sobre las ventas y actualiza el contador de ventas por día
data.forEach((venta) => {
  const fecha = new Date(venta.fecha).toLocaleDateString();
  if (ventasPorDia[fecha]) {
    ventasPorDia[fecha]++;
  } else {
    ventasPorDia[fecha] = 1;
  }
});

// Obtén el contador de ventas para el día actual
const ventasDelDiaActual = ventasPorDia[fechaActual] || 0; // Si no hay ventas, se establece en 0
console.log(`Ventas realizadas hoy (${fechaActual}): ${ventasDelDiaActual}`);

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
  <div className="flex items-center justify-between">
    <div className="text-xl font-semibold text-blue-800">
      
        <div className='flex items-center'>
        <TiChartLine style={{ color: 'purple' }} />
      
      <p className="text-xl font-semibold text-blue-800 pl-4">
        Ventas
      </p>
        </div>
      <p className="text-sm text-blue-600">Fecha: {fechaActual}</p>
    </div>
    <span className='text-lg font-semibold text-blue-800 pr-4'>Cantidad: 
      <span className="text-lg font-semibold text-black p-4"> {ventasDelDiaActual}</span> </span>
  </div>
</div>
  )
}

export default VentasPorDia