import { createContext, useContext, useState } from "react";

import {
  crearUsuarioRequest,
  deleteUsuarioRequest,
  getUsuarioRequest,
  getUsuariosRequest,
  updateUsuarioRequest
} from "../api/usuarios";

const UsuarioContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuarioContext);
  if (!context)
    throw new Error("useUsuario must be used within a UsuarioProvider");
  return context;
};

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    try {
      const res = await getUsuariosRequest();
      setUsuarios(res.data);
      //console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const deleteUsuario = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      console.log(res)
      if (res.status === 204)
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createUsuario = async (Usuario) => {
    try {
      const res = await crearUsuarioRequest(Usuario);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      await updateUsuarioRequest(id, usuario);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        getUsuarios,
        getUsuario,
        createUsuario,
        deleteUsuario,
        updateUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}