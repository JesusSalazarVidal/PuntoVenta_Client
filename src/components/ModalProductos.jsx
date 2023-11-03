import React, { useState } from "react";
import { useProduct } from "../Context/ProductContext";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

function ModalProductos({ isOpen, onClose, tipo }) {

  const Categoria = ["Agua", "Leche"];
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [categoriaSelected, setCategoriaSelected] = useState(null);

  const {
    getProductosByTipo,
    producto,
    getProductosByCategoria,
    categoriaProductos,
    getCategoriasByTipo,
    categorias,
  } = useProduct();


  useEffect(() => {
    if (isOpen) {
      //getProductosByTipo(tipo);
      getProductosByTipo(tipo);
      getCategoriasByTipo(tipo);
      // Solo inicializa el estado la primera vez que se abre el modal
      if (orderedProducts.length === 0) {
        const initialOrderedProducts = [...categoriaProductos];
        setOrderedProducts(initialOrderedProducts);}

    }
  }, [tipo,isOpen, categoriaProductos]);

  //const [productsOrder, setProductsOrder] = useState([]);
useEffect(() => {
  if (categoriaProductos) {
    setOrderedProducts(categoriaProductos);
  }
}, [categoriaProductos]); 

const handleProductReorder = (startIndex, endIndex) => {
  const updatedProducts = [...orderedProducts];
  console.log("update orden", updatedProducts)
  const [movedProduct] = updatedProducts.splice(startIndex, 1);
  updatedProducts.splice(endIndex, 0, movedProduct);
  setOrderedProducts(updatedProducts);
  console.log("ordenado", updatedProducts)
};

  if (!isOpen) return null;
 
console.log("map orden", orderedProducts)
  return (
    <div className="fixed inset-0 flex items-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-white w-3/5 h-auto mx-16 p-4 rounded shadow-lg relative z-50">
        {/* Icono en la esquina superior derecha */}
        <div className="absolute top-0 right-0 p-2">
          <FaArrowLeft
            size={32}
            onClick={() => {
              if (categoriaSelected) {
                setCategoriaSelected(false);
              } else {
                onClose();
              }
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 mt-7">
          {!categoriaSelected //si la categoria no esta seleccionada mustra las categorias 
            ? categorias.map((categoria) => (
                <div
                  key={categoria._id}
                  onClick={() => {
                    getProductosByCategoria(categoria.nombre);
                    setCategoriaSelected(true);
                  }}
                  className="relative p-4 shadow-lg cursor-pointer rounded:md border bg-pink-300 hover:bg-purple-300"
                >
                  <h1> {categoria.nombre} </h1>
                </div>
              ))
            : orderedProducts &&
            orderedProducts.map((product, index) => (
                <div
                 
                key={product._id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const startIndex = e.dataTransfer.getData("text/plain");
                  handleProductReorder(Number(startIndex), index);
                }}
                >
                <ProductCard product={product} />
                </div>
              ))}
          {/*
          {productsOrder && 
            productsOrder.map((product, index) => (
              <div
                key={product._id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <ProductCard product={product} />
              </div>
            ))}
            */}
        </div>
      </div>
    </div>
  );
}

export default ModalProductos;
/*
<div className="fixed inset-0 flex items-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-white w-3/5 h-auto mx-16 p-4 rounded shadow-lg relative z-50">
        {/* Icono en la esquina superior derecha 
        <div className="absolute top-0 right-0 p-2">
          <FaArrowLeft size={32} onClick={onClose} />
        </div>

        <div className="grid grid-cols-4 gap-4 mt-7">
          {producto &&
            producto.map((product) => (
              <ProductCard product={product} key={product._id} />
              
            ))}
        </div>
      </div>
    </div>*/