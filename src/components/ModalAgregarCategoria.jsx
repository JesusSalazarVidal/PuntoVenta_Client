import { AiOutlineClose } from "react-icons/ai";
import TipoFormPage from "../pages/TipoFormPage";
import CategoriaFormPage from "../pages/CategoriaFormPage";

function ModalAgregarCategoria({ isOpenCategoria, onCloseCategoria}) {
    if (!isOpenCategoria) return null;
  
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-emerald-300 w-2/5 p-1 rounded relative shadow-lg z-50">
            <div className="absolute top-0 right-0 p-2">
              <AiOutlineClose
                size={32}
                onClick={onCloseCategoria}
                style={{ color: "red" }}
              />
            </div>
            {/* Contenido del modal */}
            <CategoriaFormPage />
          </div>
        </div>
      );
  
}

export default ModalAgregarCategoria