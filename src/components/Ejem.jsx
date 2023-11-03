import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const paletasData = [
    {
      categoria: "Leche",
      paletas: [
        { nombre: "Paleta de Leche 1", precio: 2.5 },
        { nombre: "Paleta de Leche 2", precio: 3.0 },
      ],
    },
    {
      categoria: "Agua",
      paletas: [
        { nombre: "Paleta de Agua 1", precio: 1.5 },
        { nombre: "Paleta de Agua 2", precio: 2.0 },
      ],
    },
    {
      categoria: "Light",
      paletas: [
        { nombre: "Paleta Light 1", precio: 2.0 },
        { nombre: "Paleta Light 2", precio: 2.5 },
      ],
    },
    // Agregar más categorías y paletas si es necesario
  ];

function Ejem({isOpen, onClose}) {
    if (!isOpen) return null;

    const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
    const abrirCategoria = (categoria) => {
      setCategoriaSeleccionada(categoria);
      setMostrarModalCategorias(true);
    };
  
    const regresarCategorias = () => {
      setCategoriaSeleccionada(null);
      setMostrarModalCategorias(false);
    };

    // Componente que muestra los precios de paletas en una categoría
function PaletasCategoria({ categoria }) {
    return (
      <div>
        <h3>{categoria.categoria}</h3>
        <ul>
          {categoria.paletas.map((paleta) => (
            <li key={paleta.nombre}>
              {paleta.nombre}: ${paleta.precio}
            </li>
          ))}
        </ul>
      </div>
    )}

    return (
        <div className="fixed inset-0 flex items-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-white w-3/5 h-auto mx-16 p-4 rounded shadow-lg relative z-50">
      
            <div className="absolute top-0 right-0 p-2">
              {mostrarModalCategorias ? (
                <button onClick={regresarCategorias} className="text-gray-600 hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : <div className="absolute top-0 right-0 p-2">
              <FaArrowLeft size={32} onClick={onClose} />
            </div>}
            </div>
            {mostrarModalCategorias ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Paletas de {categoriaSeleccionada.categoria}</h2>
                <PaletasCategoria categoria={categoriaSeleccionada} />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Paletas</h2>
                <ul>
                  {paletasData.map((categoria) => (
                    <li key={categoria.categoria}>
                      <button
                        onClick={() => abrirCategoria(categoria)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {categoria.categoria}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }

export default Ejem