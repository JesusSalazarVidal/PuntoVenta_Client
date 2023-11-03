import { createContext, useContext, useState } from "react";

import {
  crearIngresoRequest,
  deleteIngresoRequest,
  getIngresoRequest,
  getIngresosRequest,
  updateIngresoRequest,
  getIngresosByFechaRequest,
  getIngresosEntreFechasRequest,
} from "../api/ingresos";

const IngresoContext = createContext();

export const useIngresos = () => {
  const context = useContext(IngresoContext);
  if (!context)
    throw new Error("useIngreso must be used within a EgresoProvider");
  return context;
};

export function IngresoProvider({ children }) {
  const [ingresos, setIngresos] = useState([]);

  const getIngresos = async () => {
    try {
      const res = await getIngresosRequest();
      setIngresos(res.data);
      //console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIngreso = async (id) => {
    try {
      const res = await deleteIngresoRequest(id);
      console.log(res);
      if (res.status === 204)
        setIngresos(ingresos.filter((ingreso) => ingreso._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createIngreso = async (ingreso) => {
    try {
      const res = await crearIngresoRequest(ingreso);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getIngreso = async (id) => {
    try {
      const res = await getIngresoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateIngreso = async (id, ingreso) => {
    try {
      await updateIngresoRequest(id, ingreso);
    } catch (error) {
      console.error(error);
    }
  };

  const getIngresosByFecha = async (fecha) => {
    try {
      const res = await getIngresosByFechaRequest(fecha);
      setIngresos(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getIngresosEntreFechas = async (fechas) => {
    try {
      const res = await getIngresosEntreFechasRequest(fechas);
      setIngresos(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IngresoContext.Provider
      value={{
        ingresos,
        getIngresos,
        getIngreso,
        createIngreso,
        deleteIngreso,
        updateIngreso,
        getIngresosByFecha,
        getIngresosEntreFechas,
      }}
    >
      {children}
    </IngresoContext.Provider>
  );
}
