import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useUsuarios } from "../Context/UsuariosContext";
import Logo from "../img/logo.png";

function UsuarioEditar({id}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const { updateUsuario, getUsuario } = useUsuarios();
  const navigate = useNavigate();
  const params = useParams();
  //console.log(params);

  useEffect(() => {
    async function loadUsuario() {
      if (id) {
        const usuario = await getUsuario(id);
        console.log(usuario);
        setValue("nombre", usuario.nombre);
        setValue("nombreUsuario", usuario.nombreUsuario);
        setValue("password", usuario.password);
        setValue("huella", usuario.huella);
      }
    }
    loadUsuario(); 
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    updateUsuario(id, values);
    //navigate("/sidebarMenu");
  });
 
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-pink-300 border-2 border-pink-800 p-10 rounded-md">
        <div className="flex justify-center items-center">
          <img className="w-1/2 h-auto mb-5" src={Logo} />
        </div>
        <h1 className="text-2xl font-bold">Registro</h1>
        {RegisterErrors.map((error, i) => (
          <div className="bg-red-500 text-white" key={i}>
            {error}
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} >
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
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-white text-black px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-red-500">El nombre es requerido</p>
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
          <input
            type="text"
            {...register("huella", { required: true })}
            className="w-full bg-white text-black px-4 py-2 rounded-md my-2"
            placeholder="Huella"
          />
          {errors.huella && (
            <p className="text-red-500">La huella es requerida</p>
          )}

          <button
            className="text-fuchsia-600 bg-white p-1 rounded font-bold justify-center"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UsuarioEditar;
