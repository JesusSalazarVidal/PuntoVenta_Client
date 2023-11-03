import ModalProductos from "../components/ModalProductos";
import { useState, useEffect } from "react";
import Paletas from '../img/Paletas.png'
import Malteadas from '../img/Malteadas.png'
import Nachos from '../img/Nachos.png'
import Nieves from '../img/Nieves.png'
import Aguas from '../img/Aguas.png'
import Otros from '../img/Otros.png'
import Preparados from '../img/Preparados.png'
import Ejem from "./Ejem";


const tipoImagenes = {
  Paletas,
  Malteadas,
  Nachos,
  Nieves,
  Aguas,
  Otros,
  Preparados,
};

function TiposProducto({tipo}) {
  

  //const [isModalOpen, setModalOpen] = useState(false);
  // rastrear si el elemento esta seleccionado
  const [isSelected, setIsSelected] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(""); // Nuevo estado para el tipo seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    console.log("Abriendo modal para tipo:", tipo);
    //setModalOpen(true);
    setIsModalOpen(true);
    setIsSelected(true);
    setSelectedTipo(tipo); // Establece el tipo seleccionado al abrir el modal
    //setProductsOrder([...productsOrder]); // Clonar el orden de los productos
  
  };

  const closeModal = () => {
    console.log("Cerrando modal para tipo:", tipo);
    //setModalOpen(false);
    setIsSelected(false);
    setSelectedTipo(""); // Reinicia el tipo seleccionado al cerrar el modal
    setIsModalOpen(false);
   //setProductsOrder(productsOrder); // Al cerrar, actualiza el orden
    
  
  };
  
  return (
    <>
      <div
        onClick={openModal}
        className={`max-w-md w-full p-10 rounded-md border-2 ${
          isSelected ? 'bg-purple-400' : 'bg-pink-300 hover:bg-purple-400'
        } border-pink-700`}  
      >
        <header className="flex justify-center">
          <h1 className="text-2xl font-bold">{tipo}</h1>
        </header>
        <img src={tipoImagenes[tipo]} alt={tipo} className="w-40 h-auto object-cover mb-2" />
      </div>
      <ModalProductos
     isOpen={isSelected && tipo === selectedTipo} // Verifica el tipo seleccionado
     // isOpen={isModalOpen}
        onClose={closeModal}
        tipo={tipo} 
         
      /> 
    </>
  );
}

export default TiposProducto;
