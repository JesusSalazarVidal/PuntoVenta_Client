import DetalleVenta from "./DetalleVenta";

import { AiOutlineClose } from "react-icons/ai";

function ModalVenta({ isOpen, onClose, registro }) {
    if(!isOpen) return null 

  
  console.log(registro)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container border-2 border-pink-800 rounded-md relative shadow-lg z-50">
        <div className=" absolute top-0 right-0 p-2">
          {/* Contenido del modal */}
        <AiOutlineClose size={32} onClick={onClose} style={{color:"red"}}/>
        </div>

        <DetalleVenta vent={registro} />
      </div>
    </div>
  );
}

export default ModalVenta;
