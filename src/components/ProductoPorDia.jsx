import React from 'react'
import { CgShoppingBag } from "react-icons/cg";

function ProductoPorDia({data}) {
   
    // Objeto para almacenar el contador de productos vendidos por día
const productosVendidos = {};

// Obtener la fecha actual y convertirla a un formato comparable
const fechaActual = new Date().toLocaleDateString();

// Filtrar las ventas del día actual
const ventasDelDia = data.filter((venta) => {
    const fecha = new Date(venta.fecha).toLocaleDateString();
    return fecha === fechaActual;
  });

  ventasDelDia.forEach((venta) => {
    const productos = venta.productos; // Productos es un array, puede contener varios productos
    if (productos && productos.length > 0) {
      productos.forEach((productoVendido) => {
        const nombreProducto = productoVendido.nombre || "Producto Desconocido";
        const cantidadVendida = productoVendido.cantidad || 0; // Obtener la cantidad vendida
        if (productosVendidos[nombreProducto]) {
          productosVendidos[nombreProducto] += cantidadVendida;
        } else {
          productosVendidos[nombreProducto] = cantidadVendida;
        }
      });
    } else {
      console.log("Venta sin productos");
    }
  });
  
 // Encontrar todos los productos con la máxima cantidad vendida
const productosMasVendidos = [];
let cantidadMasVendida = 0;

for (const producto in productosVendidos) {
  const cantidadVendida = productosVendidos[producto];
  if (cantidadVendida > cantidadMasVendida) {
    productosMasVendidos.length = 0; // Restablecer la lista si encontramos un nuevo máximo
    cantidadMasVendida = cantidadVendida;
  }

  if (cantidadVendida === cantidadMasVendida) {
    productosMasVendidos.push(producto);
  }
}

console.log(`Productos más vendidos hoy (${fechaActual}):`);
productosMasVendidos.forEach((producto) => {
  console.log(`${producto} (${cantidadMasVendida} unidades vendidas)`);
});


  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
  <div className="flex items-center justify-between">
    <div className="text-xl font-semibold text-blue-800">
      <div className='flex items-center '>
      <CgShoppingBag style={{ color: 'purple' }} />
      <p className="text-lg font-semibold text-blue-800 pl-4">Producto</p>
      </div>
      <p className="text-sm text-blue-600">Fecha: {fechaActual}</p>
    </div>
    
    <p className="text-2xl font-bold text-blue-800">
  {productosMasVendidos.map((producto, index) => (
    <div key={index}>
      <span className='text-lg font-semibold pr-4'>Nombre: 
      <span className="text-lg font-semibold text-black p-1"> {producto}</span> </span>
      <br />
      <span className='text-lg font-semibold pr-4'>Cantidad: 
      <span className="text-lg font-semibold text-black p-1"> {cantidadMasVendida}</span></span> 
    </div>
  ))}
</p>
  </div>
</div>

  )
}

export default ProductoPorDia