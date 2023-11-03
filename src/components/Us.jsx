import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function Us() {
  const { logout, usuario } = useAuth();

  return (
    <div className="bg-pink-200 p-4 absolute top-0 right-20 mt-14 rounded-lg shadow-lg">
  <div className="text-center">
    <h1 className="text-2xl font-bold text-purple-600">{usuario.nombre}</h1>
    <p className="text-sm text-gray-600">Usuario: {usuario.nombreUsuario}</p>
  </div>
  <ul className="mt-4 space-y-2">
    {usuario.nombre === 'Administrador' ? (
      <>
        <li>
          <Link to="/sidebarMenu" className="flex items-center text-purple-600 hover:underline">
            <span className="mr-2">
              <i className="fas fa-cogs"></i>
            </span>
            Panel Administrador
          </Link>
        </li>
        <li>
          <Link to="/index" className="flex items-center text-purple-600 hover:underline">
            <span className="mr-2">
              <i className="fas fa-shopping-cart"></i>
            </span>
            Generar Venta
          </Link>
        </li>
      </>
    ) : null}
    <li>
      <Link to="/" onClick={logout} className="flex items-center text-purple-600 hover:underline">
        <span className="mr-2">
          <i className="fas fa-sign-out-alt"></i>
        </span>
        Salir
      </Link>
    </li>
  </ul>
</div>


  )
}  

export default Us;
