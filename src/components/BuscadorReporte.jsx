import { useState } from "react";

function BuscadorReporte({ onSearch }) {
  const [fecha, setFecha] = useState("");
  const handleSearch = () => {
    onSearch(fecha);
  };
  return (
    <div className="flex items-center">
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        class="w-40 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        className="ml-3 px-4 py-2 bg-pink-300 font-bold text-gray-900 rounded-md hover:bg-purple-500 hover:text-white"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
}

export default BuscadorReporte;
