import { TiChartLine } from "react-icons/ti";
import { CgShoppingBag } from "react-icons/cg";
import {
  TbBusinessplan,
  TbCoin,
  TbShoppingBagPlus,
  TbCoins,
  TbPremiumRights,
} from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";
import React, { useState } from "react";
import ProductPage from "../pages/ProductPage";
import VentasPage from "../pages/VentasPage";
import EgresosPage from "../pages/EgresosPage";
import IngresosPage from "../pages/IngresosPage";
import UsuariosPage from "../pages/UsuariosPage";
import EstadisticosPage from "../pages/EstadisticosPage";
import Logo from "../img/logo.png";
import ProductPageForm from "../pages/ProductPageForm";
import EgresoFormPage from "../pages/EgresoFormPage";
import IngresosFormPage from "../pages/IngresosFormPage";
import { RiAddFill } from "react-icons/ri";
import ResumenGeneral from "../pages/ResumenGeneral";
import { BsFileBarGraph } from "react-icons/bs";

function SidebarMenu() {
  const [activeTab, setActiveTab] = useState(null); // Estado para rastrear la pestaña activa

  const handleTabClick = (tabName) => {
    // Esta función cambiará el estado activeTab cuando se haga clic en una pestaña
    setActiveTab(tabName);
  };

  return (
    <div>
      {/* Barra lateral */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 mt-1 overflow-y-auto bg-emerald-300 border-r-2 border-l-2 border-pink-800 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className={`flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group ${
                  activeTab === "productos" ? "bg-purple-500" : ""
                }`}
                onClick={() => handleTabClick("productos")}
              >
                <CgShoppingBag className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950" />
                <span className="p-2 font-bold">Productos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group ${
                  activeTab === "ventas" ? "bg-purple-500" : ""
                }`}
                onClick={() => handleTabClick("ventas")}
              >
                <TiChartLine className="flex-shrink-0 w-5 h-5 text-purple-950 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="p-2 font-bold">Ventas</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group ${
                  activeTab === "egresos" ? "bg-purple-500" : ""
                }`}
                onClick={() => handleTabClick("egresos")}
              >
                <TbCoin className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950" />
                <span className="p-2 font-bold">Egresos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group ${
                  activeTab === "ingresos" ? "bg-purple-500" : ""
                }`}
                onClick={() => handleTabClick("ingresos")}
              >
                <TbBusinessplan className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950" />
                <span className="p-2 font-bold">Ingresos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group ${
                  activeTab === "usuarios" ? "bg-purple-500" : ""
                }`}
                onClick={() => handleTabClick("usuarios")}
              >
                <BsFillPersonFill className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950" />
                <span className="p-2 font-bold">Usuarios</span>
              </a>
            </li>
            {/*
            <li>
              <a
                href="#"
                className={`flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group ${
                  activeTab === "estadisticos" ? "bg-purple-500" : ""
                }`}
                onClick={() => handleTabClick("estadisticos")}
              >
                <BsFileBarGraph className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-950" />
                <span className="p-2 font-bold">Estadísticos</span>
              </a>
            </li>
              */}
          </ul>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="mt-16 sm:ml-64">
        {!activeTab && (
          <div className=" mt-20">
            {/* Aquí coloca el contenido principal */}
            {/*  <h1 className='font-bold text-center p-10 text-3xl'> ~ Bienvenido ~  </h1> */}
            {/* <img className="mx-auto w-1/2 h-auto" src={Logo} /> */}
            <ResumenGeneral />
          </div>
        )}
        {activeTab === "productos" && (
          <div>
            {/* Aquí coloca el contenido específico de la página de Productos */}
            <ProductPage />
          </div>
        )}

        {activeTab === "ventas" && (
          <div>
            {/* Aquí coloca el contenido específico de la página de Ventas */}
            <VentasPage />
          </div>
        )}

        {activeTab === "egresos" && (
          <div>
            {/* Aquí coloca el contenido específico de la página de egresos */}
            <EgresosPage />
          </div>
        )}

        {activeTab === "ingresos" && (
          <div>
            {/* Aquí coloca el contenido específico de la página de ingresos */}
            <IngresosPage />
          </div>
        )}

        {activeTab === "usuarios" && (
          <div>
            {/* Aquí coloca el contenido específico de la página de Ventas */}
            <UsuariosPage />
          </div>
        )}

        {activeTab === "estadisticos" && (
          <div>
            {/* Aquí coloca el contenido específico de la página de Ventas */}
            <EstadisticosPage />
          </div>
        )}
      </div>
    </div>
  );
}
export default SidebarMenu;

/*
 <div>
     
      <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 mt-1 overflow-y-auto bg-emerald-300 border-r-2 border-l-2 border-pink-800 dark:bg-gray-800">

<ul className="space-y-2 font-medium">


<li>
<a
  to="/obtenerProductos"
  className='flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group bg-purple-600 ' 
 
>
</a>
</li>
  <li>
    <a className="flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group">
      <CgShoppingBag className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-purple-600" />
      <Link to="/obtenerProductos" className="p-2 font-bold">
        Productos
      </Link>
    </a>
  </li>
  <li>
    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group">
      <TiChartLine className="flex-shrink-0 w-5 h-5 text-purple-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      <Link to="/obtenerVentas" className="p-2 font-bold">
        Ventas
      </Link>
    </a>
  </li>
  <li>
    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group">
      <TbCoin className="flex-shrink-0 w-5 h-5 text-purple-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      <Link to="/obtenerEgresos" className="p-2 font-bold">
        Egresos
      </Link>
    </a>
  </li>
  <li>
    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group">
      <TbBusinessplan className="flex-shrink-0 w-5 h-5 text-purple-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      <Link to="/ingresos" className="p-2 font-bold">
        Ingresos
      </Link>
    </a>
  </li>
  <li>
    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-500 dark:hover:bg-gray-700 group">
      <BsFillPersonFill className="flex-shrink-0 w-5 h-5 text-purple-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      <Link to="/usuarios" className="p-2 font-bold">
        Usuarios
      </Link>
    </a>
  </li>
</ul>
</div>
      </aside>

    
      <div className="mt-16 sm:ml-64">
      
      </div>
    </div>*/
