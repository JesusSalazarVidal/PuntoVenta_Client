import { Link } from "react-router-dom";
import { useEgresos } from "../Context/EgresosContext";
import { useIngresos } from "../Context/IngresosContext";
import Paginator from "./Paginator";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbPremiumRights } from "react-icons/tb";
import ModalAgregar from "./ModalAgregar";
import ModalEditar from "./ModalEditar";
import ModalAgregarIngreso from "./ModalAgregarIngreso";
import ModalEditarIngreso from "./ModalEditarIngreso";

function Tabla({ data, tipo }) {
  const [egresosData, setEgresosData] = useState(data);
  //Verificamos si el arreglo de datos esta vacio o es nulo
  if (!data.length === 0) return <h1>No hay datos disponibles</h1>;

  const { deleteEgreso, getEgresos, egresos } = useEgresos();

  const { deleteIngreso, getIngresos, ingresos } = useIngresos();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isIngresosModalOpen, setIsIngresosModalOpen] = useState(false);
  const [isIngresosEditModalOpen, setIsIngresosEditModalOpen] = useState(false);
  const [selectedIngreso, setSelectedIngreso] = useState(null);
  const [idEditar, setidEditar] = useState();
  const [isEditing, setIsEditing] = useState();
  const [isFirstTime, setIsFirstTime] = useState(true);

  
  // Estados para el paginador
  const itemsPerPage = 1; // Una página por día
  const [currentPage, setCurrentPage] = useState(1);

  let newData = null;

  if (tipo === "Egresos") {
    newData = egresos;
  } else if (tipo === "Ingresos") {
    newData = ingresos;
  }

  console.log(ingresos);

  // Agrupa las registros por día
  const registrosByDay = newData.reduce((acc, registro) => {
    const fecha = new Date(registro.fecha).toLocaleDateString();
    if (!acc[fecha]) {
      acc[fecha] = [];
    }
    acc[fecha].push(registro);
    return acc;
  }, {});

  const uniqueDates = Object.keys(registrosByDay);


  // Función para cambiar la página
  const handlePageChange = (page) => {
    // Asegúrate de que la página sea válida y está dentro del rango
  if (page >= 1 && page <= uniqueDates.length) {
    // Establece la nueva página actual
    setCurrentPage(page);

    // Accede a los datos correspondientes a la página seleccionada
    const currentDate = uniqueDates[page - 1];
    const newPaginatedData = registrosByDay[currentDate] || [];

    // Actualiza la vista con los datos de la página
    // Esto podría incluir la asignación de newPaginatedData a una variable de estado o directamente al componente de la tabla
  }
  };

  // Filtra los datos según la página actual (por día)
  const currentDate = uniqueDates[currentPage - 1];
  const paginatedData = registrosByDay[currentDate] || [];

  // fecha y hora
  function formatFecha(fechaString) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(fechaString).toLocaleString(undefined, options);
  }

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setIsEditing(true);
    setIsFirstTime(false);
  };
  const openIngresosModal = () => {
    setIsIngresosModalOpen(true);
    setIsEditing(true);
    setIsFirstTime(false);
  };

  const openEditModal = (register) => {
    console.log(register);
    if (register) {
      setSelectedProduct(register);
      setidEditar(register);
      setIsEditModalOpen(true);
      setIsEditing(true);
      setIsFirstTime(false);
    }
  };
  const openIngresosEditModal = (register) => {
    console.log(register);
    if (register) {
      setSelectedIngreso(register);
      setidEditar(register);
      setIsIngresosEditModalOpen(true);
      setIsEditing(true);
      setIsFirstTime(false);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      getIngresos();
      getEgresos();
      setIsFirstTime(false);
    }
    setIsFirstTime(true);
  }, [isEditing]);

  console.log(paginatedData);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end pr-2">
        <Link
          onClick={() => {
            console.log(tipo);
            if (tipo === "Egresos") {
              openAddModal();
            } else if (tipo === "Ingresos") {
              openIngresosModal();
            }
          }}
          //to={tipo === "Egresos" ? `/egresos/new` : `/crearIngreso`}
          className="flex items-center p-1 bg-pink-300 text-gray-900 rounded-lg dark:text-white hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white group"
        >
          <TbPremiumRights className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950" />
          <span className="p-1 font-bold">
            {/*{isEditing ? "Editar" : "Agregar"} {tipo === "Egresos" ? "Egreso" : "Ingreso"}*/}
            Agregar {tipo === "Egresos" ? "Egreso" : "Ingreso"}
          </span>
        </Link>
      </div>
      <div className="p-1">
        <table className=" w-full  shadow-md rounded-lg bg-white ">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="py-2 px-4"> Cantidad </th>
              <th className="py-2 px-4"> Fecha y Hora </th>
              <th className="py-2 px-4"> Descripcion </th>
              <th className="py-2 px-4"> Acciones </th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto h-80">
          <table className=" w-full shadow-md rounded-lg bg-white text-center">
            <tbody className="text-gray-700">
              {paginatedData.map((registro) => (
                <tr className="py-2 px-4" key={registro._id}>
                  <th scope="row" className="py-2 px-4">
                    {registro.cantidad}
                  </th>
                  <td className="py-2 px-4">{formatFecha(registro.fecha)}</td>
                  <th scope="row" className="py-2 px-4">
                    {registro.descripcion}
                  </th>
                  <td className="py-2 px-4 md:px-4 lg:px-6">
                    <div className="flex mx-1 md:mx-3">
                      <Link
                        onClick={() => {
                          console.log(tipo);
                          if (tipo === "Egresos") {
                            openEditModal(registro._id);
                          } else if (tipo === "Ingresos") {
                            openIngresosEditModal(registro._id);
                          }
                        }}
                        className="py-2 px-4 "
                      >
                        <BiEdit size={20} className="text-purple-600" />
                      </Link>
                      <Link className="p-2 ">
                        <RiDeleteBinLine
                          onClick={() => {
                            if (tipo == "Egresos") {
                              deleteEgreso(registro._id);
                            } else {
                              deleteIngreso(registro._id);
                            }
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

          <ModalAgregar
            isOpen={isAddModalOpen} // Para el modal de agregar
            onClose={() => {
              setIsAddModalOpen(false);
              setIsEditing(false);
            }}
            initialData={selectedProduct}
          />
          <ModalAgregarIngreso
            isOpeningreso={isIngresosModalOpen}
            onCloseingreso={() => {
              setIsIngresosModalOpen(false);
              setIsEditing(false);
            }}
            initialData={selectedIngreso}
          />

          <ModalEditar
            isOpen={isEditModalOpen} // Para el modal de editar
            onClose={() => {
              setIsEditModalOpen(false);
              setIsEditing(false);
            }}
            id={idEditar}
          />
          <ModalEditarIngreso
            isOpeningreso={isIngresosEditModalOpen}
            onCloseingreso={() => {
              setIsIngresosEditModalOpen(false);
              setIsEditing(false);
            }}
            idingreso={idEditar}
          />
        </div>
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={uniqueDates.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Tabla;
