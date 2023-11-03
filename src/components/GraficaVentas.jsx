import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'


function GraficaVentas({dataVenta}) {
console.log(dataVenta)

// Calcula la fecha de hoy
const today = new Date();
console.log(today.toLocaleDateString());


// Calcula la fecha de inicio y fin de la semana actual
const endOfWeek = new Date(today);
endOfWeek.setDate(today.getDate() - today.getDay() + 6); // Fin de la semana actual (sumar 6 para llegar al domingo)
endOfWeek.setHours(23, 59, 59, 999);

const startOfWeek = new Date(endOfWeek);
startOfWeek.setDate(endOfWeek.getDate() - 6); // Inicio de la semana actual
startOfWeek.setHours(0, 0, 0, 0);

console.log("Inicio de la semana actual:", startOfWeek.toLocaleDateString());
console.log("Fin de la semana actual:", endOfWeek.toLocaleDateString());

// Calcula la fecha de inicio y fin de la semana anterior
const endOfLastWeek = new Date(startOfWeek);
endOfLastWeek.setDate(startOfWeek.getDate() - 1); // Fin de la semana anterior
endOfLastWeek.setHours(23, 59, 59, 999);

const startOfLastWeek = new Date(endOfLastWeek);
startOfLastWeek.setDate(endOfLastWeek.getDate() - 6); // Inicio de la semana anterior
startOfLastWeek.setHours(0, 0, 0, 0);

console.log("Inicio de la semana anterior:", startOfLastWeek.toLocaleDateString());
console.log("Fin de la semana anterior:", endOfLastWeek.toLocaleDateString());

// Objeto para almacenar los montos de venta por día
const ventasPorDia = {
  Domingo: 0,
  Lunes: 0,
  Martes: 0,
  Miércoles: 0,
  Jueves: 0,
  Viernes: 0,
  Sábado: 0,
};

// Filtra las ventas de la semana anterior
const ventasSemanaAnterior = dataVenta.filter((venta) => {
  const ventaDate = new Date(venta.fecha);
  return ventaDate >= startOfLastWeek && ventaDate <= endOfLastWeek;
});
console.log("ventas semana anterior", ventasSemanaAnterior);

  // Acumula los montos de venta por día
  ventasSemanaAnterior.forEach((venta) => {
    const ventaDate = new Date(venta.fecha);
    console.log(ventaDate)
    const dayOfWeek = ventaDate.getDay(); // Obtenemos el día de la semana (0 para Domingo, 1 para Lunes, etc.)
    const dayName = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    ventasPorDia[dayName[dayOfWeek]] += venta.total;
    console.log(ventasPorDia)
  });

// Prepara los datos para la gráfica
const labels = Object.keys(ventasPorDia);
console.log(labels)
const data = Object.values(ventasPorDia);
console.log(data)


const chartData = {
  labels,
  datasets: [
    {
      label: '$ Total',
      data,
      backgroundColor: 'rgba(128, 0, 128, 0.6)', // Cambia el color de fondo
      borderColor: 'rgba(128, 0, 128, 1)', // Cambia el color del borde
    },
  ],
};

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: `Ventas de la semana ${startOfLastWeek.toLocaleDateString()} al ${endOfLastWeek.toLocaleDateString()} `,
        color: 'blue', // Cambia el color del título del eje X
      },
      ticks: {
        font: {
          size: 14, // Cambia el tamaño de fuente del eje X
        },
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Cantidad Monetaria',
        color: 'purple', // Cambia el color del título del eje Y
      },
      ticks: {
        font: {
          size: 14, // Cambia el tamaño de fuente del eje X
        },
      },
    },
  },
};

return (
  <div className="ventas-chart p-4 bg-white shadow-md rounded-lg">
  <h1 className="text-2xl font-semibold mb-4">Gráfico de Ventas</h1>
  <Bar data={chartData} options={options} />
</div>
);
};

export default GraficaVentas