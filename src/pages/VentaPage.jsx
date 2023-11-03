import { useEffect, useState } from 'react'
import { useVentas } from '../Context/VentasContext'
import {useProduct} from '../Context/ProductContext'
import VentaCard from '../components/VentaCard';
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator"

function VentaPage() {
  const {getVentas, venta} = useVentas();
  const {getProductos, producto} = useProduct();

    // Estados para el paginador
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Cambia este valor según tus necesidades numero de elementos por pagina
  
    // Calcula el total de páginas
    const totalPages = Math.ceil(venta.length / itemsPerPage);
  
    
    // Función para cambiar la página
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    // Filtra los datos según la página actual
    const paginatedData = venta.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  

  useEffect(() => {
    getVentas()
    getProductos()
  }, [])

 // if (venta.length === 0) return (<h1>No Hay Ventas</h1>)

  return (
   <div className='sm:ml-64'>
    <div className="w-8">
      <Link
            to={"/crearVenta"}
            className="text-pink-800 hover:text-black"
          >
            <AiOutlinePlusSquare size={30} />
          </Link>
      </div>
    <h1 className='text-3xl font-bold text-center pb-5 mb-3'>Ventas</h1>
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 ">
        {paginatedData.map((vent, index) => {
          // Busca el producto correspondiente por su productId
          const resultado = producto.find((product) => product._id === vent.productos);
          //console.log(resultado)
          // Asegúrate de que el producto exista antes de mostrarlo
          if (resultado) {
            return (
              <VentaCard vent={vent} key={index} resultado={resultado}/>
            );
          }
          return null; // Ignora ventas con productos no encontrados
        })}
        </div>
        <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default VentaPage

/*
<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 ">
        {venta.map((vent, index) => {
          // Busca el producto correspondiente por su productId
          const resultado = producto.find((product) => product._id === vent.productos);
          console.log(resultado)
          // Asegúrate de que el producto exista antes de mostrarlo
          if (resultado) {
            return (
              <VentaCard vent={vent} key={index} resultado={resultado}/>
            );
          }
          return null; // Ignora ventas con productos no encontrados
        })}
    </div>
    */