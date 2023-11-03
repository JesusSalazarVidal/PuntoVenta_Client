import { useProduct } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { useVentas } from "../Context/VentasContext";
import { useState } from "react";

function ProductCard({ product }) {
  
  const { deleteProducto } = useProduct();
  const { cuenta, setCuenta } = useVentas();

  const [isSelected, setIsSelected] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const cardClassName = `relative p-4 shadow-lg cursor-pointer rounded:md border transform transition-transform
   ${
     isSelected ? "scale-125 bg-blue-300 " : "bg-pink-300 hover:bg-purple-300"
   }`;

  function handleAgregarProducto() {
    console.log("Agregando producto:", product);
    const nuevoProducto = { ...product };
    const prevProductos = cuenta.productos;

    // Verificar si el producto ya existe en el array de productos
    const productoExistenteIndex = prevProductos.findIndex(
      (producto) => producto._id === nuevoProducto._id
    );

    if (productoExistenteIndex !== -1) {
      // Si el producto ya existe, aumenta la cantidad en lugar de agregarlo
      prevProductos[productoExistenteIndex].cantidad += 1;
    } else {
      // Si el producto no existe, agrégalo a la cuenta con cantidad 1
      nuevoProducto.cantidad = 1;
      prevProductos.push(nuevoProducto);
    }

    // Calcular el nuevo total
    const nuevoTotal = prevProductos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

    // Actualiza la cuenta con los productos y el nuevo total
    setCuenta((prevCuenta) => ({
      ...prevCuenta,
      productos: prevProductos,
      total: nuevoTotal,
    })); 

    setIsSelected(true);
    setIsProductAdded(true);

    // Simula un retraso de 2 segundos antes de restablecer el estado
    setTimeout(() => {
      console.log("Restableciendo estado");
      setIsSelected(false);
      setIsProductAdded(false);
    }, 500); // 2 segundos
    
  }
  //console.log(cuenta)

  return (
    <>
      <div onClick={handleAgregarProducto} className={cardClassName}>
        <h1 className="text-2xl font-bold">{product.nombre}</h1>
        <h2 className="text-blue-500 text-3xl font-bold mt-3">
          ${product.precio}
        </h2>
      </div>
    </>
  );
}

export default ProductCard;

//<p>{new Date(product.fecha).toLocaleDateString()}</p>
