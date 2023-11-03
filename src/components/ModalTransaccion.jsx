import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useVentas } from "../Context/VentasContext";
import { useIngresos } from "../Context/IngresosContext";

function ModalTransaccion({ isOpen, onClose, venta }) {
  if (!isOpen) return null;
  const [cantidadRecibida, setCantidadRecibida] = useState("");

  const [cambio, setCambio] = useState(0);

  const ingreso = { cantidad: venta.total };
  const { createVenta, setMensajeError, mensajeError } = useVentas();
  const { createIngreso } = useIngresos();
 
  const handleCantidadCambio = (event) => {
    const value = parseFloat(event.target.value);
    setCantidadRecibida(value);
    calcularCambio(value);
  };

  const calcularCambio = (cantidad) => {
    const totalVenta = venta.total;
    const cambioTotal = cantidad - totalVenta;
    setCambio(cambioTotal);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container bg-white border border-gray-300 w-2/6 mx-5 p-4 rounded-lg shadow-lg absolute z-50 right-0 top-20">
        <div className="absolute top-0 right-0 p-2">
          <AiOutlineClose
            size={32}
            onClick={onClose}
            style={{ color: "red" }}
          />
        </div>
        <h1 className="text-center font-bold text-2xl mb-2">Venta</h1>
        {mensajeError && (
          <div className="bg-red-500 p-2 text-white mb-3" >{mensajeError}</div>
        )}

        <div className="border-t border-b border-gray-300 py-2 my-2">
          <h3 className="text-lg font-semibold">Productos:</h3>

          <ul className="list pl-6 mt-2">
            {venta.productos.map((producto) => (
              <li key={producto.id} className="text-gray-800">
                {producto.cantidad} {producto.nombre} $
                {producto.precio.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold text-purple-600">
            ${venta.total.toFixed(2)}
          </span>
        </div>

        <form name="cambio" className="mt-4">
          <div className="mb-2">
            <label className="block text-sm font-semibold">
              Cantidad Recibida:
            </label>
            <input
              type="number"
              value={cantidadRecibida}
              onChange={handleCantidadCambio}
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 w-full"
              autoFocus
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Cambio:</span>
            <span className="text-lg font-bold">${cambio.toFixed(2)}</span>
          </div>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={()=>{
              if (cantidadRecibida >= venta.total) {
                setCantidadRecibida("");
                setCambio(0);
                createVenta(venta);
                // Crear un objeto de ingreso con las especificaciones
                const ingreso = {
                  cantidad: venta.total, // Utilizar el total de la venta como cantidad
                  fecha: venta.fecha, // Utilizar la misma fecha de la venta
                  descripcion: "Ingreso generado por una venta",
                };
                createIngreso(ingreso);
                onClose();
              }else{
                setMensajeError("La cantidad ingresada no puede ser menor que el total")
              }
            }}
            className="bg-blue-500 text-white w-full py-2 font-semibold rounded-lg hover:bg-blue-600"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalTransaccion;
