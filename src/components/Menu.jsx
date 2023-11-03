import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Menu() {
    const { logout, usuario } = useAuth();

  return (
    <div className="bg-pink-300 p-4 absolute top-0 right-0 mt-16">
      <ul className="flex gap-x-2">
        <li className="mb-2">
          <>
            <li className="mb-2 font-black text-center text-2xl">Welcome {usuario.nombreUsuario}</li>
            <li className="mb-2">
              <Link to="/crearProducto" className="hover:bg-pink-500 m-3 p-1">Nuevo Producto</Link>
            </li>
            <li className="mb-2">
              <Link to="/obtenerProductos" className="hover:bg-pink-500 m-3 p-1">Productos</Link>
            </li>
            <li className="mb-2">
              <Link to="/crearVenta" className="hover:bg-pink-500 m-3 p-1">Nueva Venta</Link>
            </li>
            <li className="mb-2">
              <Link to="/obtenerVentas" className="hover:bg-pink-500 m-3 p-1">Ventas</Link>
            </li>
            <li className="mb-2">
              <Link to="/egresos/new" className="hover:bg-pink-500 m-3 p-1">Nuevo Egreso</Link>
            </li>
            <li className="mb-2">
              <Link to="/egresos" className="hover:bg-pink-500 m-3 p-1">Egresos</Link>
            </li>
            <li className="mb-2">
              <Link to="/crearIngreso" className="hover:bg-pink-500 m-3 p-1">Nuevo Ingreso</Link>
            </li>
            <li className="mb-2">
              <Link to="/ingresos" className="hover:bg-pink-500 m-3 p-1">Ingresos</Link>
            </li>
            <li className="mb-2">
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Salir
              </Link>
            </li>
          </>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
