
function DetalleVenta({ vent }) {

    function formatFecha(fechaString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaString).toLocaleDateString(undefined, options);
      } 

  return (
    <div className="bg-white border border-gray-400 p-4 rounded-md shadow-md max-w-xs mx-auto">
  <p className="text-center text-lg font-bold mb-2"> ~ Venta ~ </p>
  <p className="text-center text-gray-600">{formatFecha(vent.fecha)}</p>

  <hr className="my-4" />

  <h3 className="text-lg font-bold">Productos:</h3>
  
  <ul className="list-disc pl-6 mt-2">
    
  
    {vent.productos.map((producto) => (
      <li key={producto.id} className="text-gray-800">
        {producto.cantidad} {producto.nombre} ${producto.precio} <br />
      </li>
    ))}
   
  </ul>

  <hr className="my-4" />

  <div className="text-center text-xl font-bold text-purple-600">
    Total: ${vent.total}
  </div>
</div>
  );
}

export default DetalleVenta;
