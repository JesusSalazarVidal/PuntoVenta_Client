import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./Context/AuthContext"

function ProtectedAdmin() {
    const {usuario} = useAuth()
    if(usuario.nombre !== "Administrador") return <Navigate to={'/index'} replace />
  return (
    <Outlet/>
  )
}

export default ProtectedAdmin