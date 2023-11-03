function ResultadosBusqueda({ resultadosEncontrados }) {
  return (
    <div>
      <h2>Ingresos del día</h2>
      <ul>
        {resultadosEncontrados.map((registro) => (
          <li key={registro._id}>
            Fecha: {registro.fecha}, Monto: ${registro.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultadosBusqueda;
