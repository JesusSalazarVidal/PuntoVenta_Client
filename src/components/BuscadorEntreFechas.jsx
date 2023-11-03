import React, { useState } from "react";

function BuscadorEntreFechas({ onSearch }) {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  

  const handleSearch = () => {
    onSearch({ fechaInicio, fechaFin });
  };

  return (
    <div className="flex items-center">
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="w-40 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <span className="mx-2">al</span>
      <input
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        className="w-40 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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

export default BuscadorEntreFechas;
