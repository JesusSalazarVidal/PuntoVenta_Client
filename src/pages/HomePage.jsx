import { useEffect, useState } from "react";
import { useIngresos } from "../Context/IngresosContext";
import { useVentas } from "../Context/VentasContext";
import TablaCuenta from "../components/TablaCuenta";
import TiposProducto from "../components/TiposProducto";
import ModalTransaccion from '../components/ModalTransaccion'
import { useProduct } from "../Context/ProductContext";


function HomePage() {
 // const [productsOrder, setProductsOrder] = useState([]); // Estado para el orden de los productos
  const { createVenta, mensaje, cuenta, mensajeError, setMensajeError, setMensaje} = useVentas();
  const ingreso = { cantidad: cuenta.total };
  const { createIngreso } = useIngresos();
  const {getTipos, tipos}= useProduct()
  const [isModalOpen, setIsModalOpen] = useState(false)



  const openModal = () => {
    if(cuenta.productos.length === 0){ 
      setIsModalOpen(false)
      setMensajeError('Agregue al menos un producto')
    }else{
      setIsModalOpen(true)
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

/*
  const tipos = [
    { id: 1, tipo: "Paletas" },
    { id: 2, tipo: "Nieves" },
    { id: 3, tipo: "Nachos" },
    { id: 4, tipo: "Malteadas" },
    { id: 5, tipo: "Aguas" },
    { id: 6, tipo: "Otros" },
  ];
  */

  useEffect(()=>{
    getTipos()
  },[])
  //console.log(tipos)

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* División izquierda (4/6 de la pantalla) */} 
      <div className="w-full md:w-4/6 p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tipos.map((tipo) => (
            
            <TiposProducto 
            key={tipo._id} 
            tipo={tipo.nombre} 
         />
          ))}      
        </div>
      </div>

      {/* División derecha (2/6 de la pantalla) */}
      <div className="w-full md:w-2/6 p-4">
        {/* Aquí se coloca la tabla de cuenta */}
        <h1 className="justify-center text-center text-3xl font-bold p-4">Cuenta</h1>
        {mensaje && (
          <div className="bg-green-500 p-2 text-white mb-3" >{mensaje}</div>
        )}
        {mensajeError && (
          <div className="bg-red-500 p-2 text-white mb-3" >{mensajeError}</div>
        )}
        <TablaCuenta data={cuenta} />

        
        <ModalTransaccion isOpen={isModalOpen} onClose={closeModal} venta={cuenta}/>

        <div className="flex justify-center items-center ">
          <button
            onClick={openModal}
            className="bg-green-400 w-[185px] h-[48px] uppercase text-black font-semibold hover:bg-blue-300 mt-5 rounded-xl"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
