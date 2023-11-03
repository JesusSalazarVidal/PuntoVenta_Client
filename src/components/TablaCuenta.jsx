import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useVentas } from "../Context/VentasContext";
import {useIngresos} from '../Context/IngresosContext'

function TablaCuenta({ data }) {
  const productos = data.productos;
  const {deleteCuenta} = useVentas()
  return (
    <>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Producto</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Cantidad</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de la tabla de cuenta */}

          {/* Otras filas de la cuenta */}
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.cantidad}</td>
              <td>
                <FontAwesomeIcon
                  onClick={() => {
                    deleteCuenta(producto._id);
                  }}
                  icon={faTrash}
                  style={{ color: "#dd3636" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end font-semibold text-2xl pt-10">
        <h1 className="text-right ">Total:</h1>
        <h2 className="text-red-600 px-4">{`$ ${data.total}`} </h2>
      </div>
      
    </>
  );
}

export default TablaCuenta;
