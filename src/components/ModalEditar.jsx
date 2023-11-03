import EgresoFormPage from "../pages/EgresoFormPage";
import { AiOutlineClose } from "react-icons/ai";

function ModalEditar({ isOpen, onClose, id}) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container bg-emerald-300 w-2/5 p-1 rounded relative shadow-lg z-50">
          <div className="absolute top-0 right-0 p-2">
            <AiOutlineClose 
              size={32}
              onClick={onClose}
              style={{ color: "red" }}
            />
          </div>
          {/* Contenido del modal */}
          <EgresoFormPage id={id}/> 
        </div>
      </div>
    );
}

export default ModalEditar