import { useForm } from "react-hook-form";
import { useProduct } from "../Context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import ModalAgregarTipo from "../components/ModalAgregarTipo";
import ModalAgregarCategoria from "../components/ModalAgregarCategoria";

function ProductPageForm({ id }) {
  const { register, handleSubmit, setValue } = useForm();
  const {
    createProducto,
    getProducto,
    updateProducto,
    getTipos,
    tipos,
    getCategorias,
    categorias,
  } = useProduct();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState();
  const [isTipoModalOpen, setIsTipoModalOpen] = useState(false);
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    // Define aquí los campos de tu formulario y sus valores iniciales
    nombre: "",
    tipo: "",
    categoria: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function loadProducto() {
      if (id) {
        const product = await getProducto(id);
        console.log(product);
        setValue("image", product.image);
        setValue("nombre", product.nombre);
        setValue("tipo", product.tipo);
        setValue("categoria", product.categoria);
        setValue("precio", product.precio);
      }
    }
    loadProducto();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (id) {
      updateProducto(id, data);
      setIsUpdateMode(false);
      setMostrarMensaje(true);
    } else {
      setIsUpdateMode(true);
      createProducto(data);
      // Muestra el mensaje de confirmación
      setMostrarMensaje(true);
      // Reinicia los campos del formulario
      setFormData({
        nombre: "",
        tipo: "",
        precio: "",
      });
    }
    //navigate("/sidebarMenu");
  });

  useEffect(() => {
    let timeout;
    if (mostrarMensaje) {
      timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 1500); // Oculta el mensaje después de 3 segundos
    }
    return () => clearTimeout(timeout);
  }, [mostrarMensaje]);

  const openTipoModal = () => {
    setIsTipoModalOpen(true);
  };

  const openCategoriaModal = () => {
    setIsCategoriaModalOpen(true);
  };

  useEffect(() => {
    getTipos();
    getCategorias();
  }, []);

  return (
    <div className="">
      {mostrarMensaje && (
        <div
          className="bg-purple-100 border-t-4 border-purple-500 rounded-b text-purple-900 px-4 py-3 shadow-md flex items-center justify-between m-5 font-bold"
          role="alert"
        >
          <p className="text-sm">
            {isUpdateMode
              ? "¡Agregado correctamente!"
              : "¡Actualizado correctamente!"}
          </p>
        </div>
      )}
      <div className="flex justify-center items-center  ">
        <div className="w-full ">
          <form
            onSubmit={onSubmit}
            className="bg-pink-200 shadow-md rounded px-8 pt-6 pb-8  border-2 border-pink-800"
          >
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Nombre
              </label>
              {isUpdateMode ? (
                <input
                  type="text"
                  {...register("nombre")}
                  className="shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  {...register("nombre")}
                  className="shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            </div>
            <label className="block text-black text-sm font-bold mb-2">
              Tipo
            </label>
            <div className="mb-4 flex items-center">
              <div className="flex w-4/5 items-center">
                {isUpdateMode ? (
                  <select
                    {...register("tipo")}
                    className=" shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.tipo}
                    onChange={handleChange}
                  >
                    <option value="">-- Selecciona --</option>
                    {tipos.map((tipo) => (
                      <option key={tipo._id} value={tipo.nombre}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    {...register("tipo")}
                    className=" shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">-- Selecciona --</option>
                    {tipos.map((tipo) => (
                      <option key={tipo._id} value={tipo.nombre}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                type="button"
                onClick={openTipoModal}
                className="shadow bg-pink-500 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded ml-2 mb-3"
              >
                Agregar
              </button>
              {/*} <GrAdd
                  size={32}
                  onClick={openTipoModal}
                  style={{ color: "blue" }}
                  className="pl-2 ml-5 mb-2"
                  /> */}
            </div>
            <label className="block text-black text-sm font-bold mb-2">
              Categoria
            </label>
            <div className="mb-4 flex items-center">
              <div className="flex w-4/5 items-center">
                {isUpdateMode ? (
                  <select
                    {...register("categoria")}
                    className=" shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.categoria}
                    onChange={handleChange}
                  >
                    <option value="">-- Selecciona --</option>
                    {categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    {...register("categoria")}
                    className=" shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">-- Selecciona --</option>
                    {categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                type="button"
                onClick={openCategoriaModal}
                className="shadow bg-pink-500 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded ml-2 mb-3"
              >
                Agregar
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Precio
              </label>
              {isUpdateMode ? (
                <input
                  type="text"
                  {...register("precio")}
                  className="shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.precio}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  {...register("precio")}
                  className="shadow appearance-none border border-pink-700 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            </div>
            <div>
              <button
                className="shadow bg-pink-500 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4  w-full rounded"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
          <ModalAgregarTipo
            isOpenTipo={isTipoModalOpen}
            onCloseTipo={() => {
              setIsTipoModalOpen(false);
            }}
          />

          <ModalAgregarCategoria
            isOpenCategoria={isCategoriaModalOpen}
            onCloseCategoria={() => {
              setIsCategoriaModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPageForm;
