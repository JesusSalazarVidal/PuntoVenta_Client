import { useVentas } from "../Context/VentasContext";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";




function VentaCard({vent, resultado}) {
    const { deleteVenta } = useVentas();

    return (
      <div className="p-4 bg-pink-500 hover:bg-pink-300 max-w-md w-full rounded-md border-2 border-pink-700">
        <header className="flex justify-between">  
          <h1 className="text-2xl font-bold">{resultado.nombre}</h1>  
          <div className="flex gap-x-2 items-center">  
            <button 
              className="text-red-600 hover:text-black"   
              onClick={() => {
                deleteVenta(vent._id); 
              }}
            >
              <FiTrash2 />
            </button>
            <Link
            to={`/obtenerVenta/${vent._id}`}
            className="text-red-600 hover:text-black"
          >
            <FiEdit3 />
          </Link>
          </div>
        </header>
        <p className="text-black">Cantidad: {vent.cantidad}</p>
        <p className="text-black">Total: {vent.total}</p>
      </div>
    );
}

export default VentaCard
