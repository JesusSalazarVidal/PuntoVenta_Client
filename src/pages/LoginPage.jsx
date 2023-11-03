import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import Logo from "../img/logo.png"

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
const { usuario} = useAuth()

  //useEffect(() => {
   // if (isAuthenticated) navigate('/index') 
 // }, [isAuthenticated])

  useEffect(() => {
    // Puedes redirigir aquí basándote en el valor de "user".
    // Por ejemplo, utilizando React Router:
    if (isAuthenticated){
    if (usuario.nombre === 'Administrador') {
      navigate('/sidebarMenu');
    } else {
      navigate('/index');
    }
  }}, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center mt-16">
      <div className="bg-emerald-300 border-2 border-pink-800 max-w-md w-full p-10 rounded-md">
      <div className="flex justify-center items-center">
      <img className="w-1/2 h-auto mb-5" src={Logo} />
      </div>
        <h1 className="text-2xl font-bold">Login</h1>
        {
        signinErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white' key={i}>{error}</div>
        ))
      }
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("nombreUsuario", { required: true })}
            className="w-full bg-white text-black px-4 py-2 rounded-md my-2"
            placeholder="Nombre de Usuario"
          />
          {errors.nombreUsuario && (
            <p className="text-red-500">Nombre de usuario es requerido</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-white text-black px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}

          <button type="submit" className="text-fuchsia-600 bg-white p-1 rounded font-bold justify-center">Iniciar sesión</button>
        </form>
        <p className="flex gap-x-2 justify-between text-fuchsia-600">
          No tienes una cuenta? <Link className="text-fuchsia-600 font-bold" to="/register">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
