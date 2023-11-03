import { useForm } from "react-hook-form";
import { useVentas } from "../Context/VentasContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../Context/ProductContext";

function VentaFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createVenta, getVenta, updateVenta } = useVentas();
  const navigate = useNavigate();
  const params = useParams(); //obtener objeto con los datos dinamicos

  const { getProductos, producto } = useProduct();

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    //cuando carge la app muestre los datos
    async function loadVenta() {
      // cargar venta
      if (params.id) {
        const vent = await getVenta(params.id);
        console.log(vent);
        setValue("productos", vent.productos);
        setValue("cantidad", vent.cantidad);
        setValue("total", vent.total);
      }
    }
    loadVenta();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateVenta(params.id, data);
    } else {
      createVenta(data);
    }
    //navigate("/obtenerVentas");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] sm:ml-64 justify-center items-center  bg-pink-400">
      <div className="w-full max-w-xs">
        <form
          onSubmit={onSubmit}
          className="bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <div className="mb-4">
            <h1 className="text-center font-black"> AGREGAR VENTA </h1>
          </div>

          <div className="mb-4 suppliers-container">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Producto
            </label>
            <select
              {...register("productos")}
              className=" shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Selecciona un producto --</option>
              {producto.map((product) => (
                <option key={product.id} value={product._id}>
                  {product.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cantidad
            </label>
            <input
            type="text"
              {...register("cantidad")}
              className="shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            ></input>
          </div>
          <div>
            <button
              className="shadow bg-pink-500 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-4 w-full rounded"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VentaFormPage;
