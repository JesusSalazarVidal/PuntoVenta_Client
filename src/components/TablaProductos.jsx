import Paginator from "./Paginator";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { BiEdit, BiLinkAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useProduct } from "../Context/ProductContext";
import { TbShoppingBagPlus } from "react-icons/tb";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalEditarProducto from "./ModalEditarProducto";

function TablaProductos({ data }) {
  const { register } = useForm();
  const { deleteProducto } = useProduct();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [idEditar, setidEditar] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const { getProductos, producto } = useProduct();

  //Verificamos si el arreglo de datos esta vacio o es nulo
  if (!data.length === 0) return <h1>No hay datos disponibles</h1>;

  // Estados para el paginador
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cambia este valor según tus necesidades numero de elementos por pagina

  // Calcula el total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = producto.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setIsEditing(true);
  };

  const openEditModal = (register) => {
    console.log(register);
    if (register) {
      setSelectedProduct(register);
      setidEditar(register);
      setIsEditModalOpen(true);
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      getProductos();
    }
  }, [isEditing]);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end pr-2">
        <Link className="flex items-center p-1  bg-pink-300 text-gray-900 rounded-lg dark:text-white hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white group">
          <TbShoppingBagPlus className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950 " />
          <button className="p-2 font-bold" onClick={openAddModal}>
            Agregar Producto
          </button>
        </Link>
      </div>
      <div className="p-1">
        <table className="w-full shadow-md rounded-lg text-center bg-whiter">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="py-2 px-2 md:px-4 lg:px-6">Nombre</th>
              {/* Ajusta el padding en diferentes tamaños de pantalla */}
              <th className="py-2 px-2 md:px-4 lg:px-6">Tipo</th>
              <th className="py-2 px-2 md:px-4 lg:px-6">Categoria</th>
              <th className="py-2 px-2 md:px-4 lg:px-6">Precio</th>
              <th className="py-2 px-2 md:px-4 lg:px-6">Fecha</th>
              <th className="py-2 px-2 md:px-4 lg:px-6">Acciones</th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto h-80">
          <table className="w-full shadow-md rounded-lg text-center bg-whiter">
            <tbody className="text-gray-700">
              {paginatedData.map((registro) => (
                <tr className="py-2 px-2 md:px-4 lg:px-6" key={registro._id}>
                  <td className="py-2 px-2 md:px-4 lg:px-6">
                    {registro.nombre}
                  </td>{" "}
                  {/* Ajusta el padding en diferentes tamaños de pantalla */}
                  <td className="py-2 px-2 md:px-4 lg:px-6">{registro.tipo}</td>
                  <td className="py-2 px-2 md:px-4 lg:px-6">{registro.categoria}</td>
                  <td className="py-2 px-2 md:px-4 lg:px-6">
                    {registro.precio}
                  </td>
                  <td className="py-2 px-2 md:px-4 lg:px-6">
                    {new Date(registro.fecha).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 lg:px-6">
                    <div className="flex mx-1 md:mx-3">
                      {" "}
                      {/* Ajusta el margen en diferentes tamaños de pantalla */}
                      <Link
                        className="p-2"
                        // to={`/actualizarProducto/${registro._id}`}

                        // to={registro._id ? `/actualizarProducto/${registro._id}` : '/paginaDeError'}>
                        onClick={() => openEditModal(registro._id)}
                      >
                        <BiEdit size={20} className="text-purple-600" />
                      </Link>
                      <Link className="p-2">
                        <RiDeleteBinLine
                          onClick={() => {
                            deleteProducto(registro._id);
                          }}
                          size={20}
                          style={{ color: "red" }}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalAgregarProducto
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setIsEditing(false);
            }}
            initialData={selectedProduct}
          />
          <ModalEditarProducto
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setIsEditing(false);
            }}
            id={idEditar}
          />
        </div>
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default TablaProductos;
