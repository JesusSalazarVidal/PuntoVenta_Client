import { createContext, useContext, useState } from "react";

import {
  crearEgresoRequest,
  deleteEgresoRequest,
  getEgresoRequest,
  getEgresosRequest,
  updateEgresoRequest,
  getEgresosByFechaRequest,
} from "../api/egresos";

const EgresoContext = createContext();

export const useEgresos = () => {
  const context = useContext(EgresoContext);
  if (!context)
    throw new Error("useEgreso must be used within a EgresoProvider");
  return context;
};

export function EgresoProvider({ children }) {
  const [egresos, setEgresos] = useState([]);

  const getEgresos = async () => {
    try {
      const res = await getEgresosRequest();
      setEgresos(res.data);
      //console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const deleteEgreso = async (id) => {
    try {
      const res = await deleteEgresoRequest(id);
      console.log(res)
      if (res.status === 204)
        setEgresos(egresos.filter((egreso) => egreso._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createEgreso = async (egreso) => {
    try {
      const res = await crearEgresoRequest(egreso);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getEgreso = async (id) => {
    try {
      const res = await getEgresoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEgreso = async (id, egreso) => {
    try {
      await updateEgresoRequest(id, egreso);
    } catch (error) {
      console.error(error);
    }
  };

  const getEgresosByFecha = async (fecha) => {
    try {
      const res = await getEgresosByFechaRequest(fecha);
      setEgresos(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EgresoContext.Provider
      value={{
        egresos,
        getEgresos,
        getEgreso,
        createEgreso,
        deleteEgreso,
        updateEgreso,
        getEgresosByFecha,
      }}
    >
      {children}
    </EgresoContext.Provider>
  );
}
