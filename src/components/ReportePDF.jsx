import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../img/logo.png";

function ReportePDF({ data }) {
  const generarPDF = () => {
    // Crear un nuevo objeto jsPDF
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "letter",
      putOnlyUsedFonts: true,
    });

    function formatFechaConNombreMes(fecha) {
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const date = new Date(fecha);
      const nombreMes = meses[date.getMonth()];

      return `${date.getDate()} de ${nombreMes} de ${date.getFullYear()}`;
    }

    // Función para agregar números de página
    const agregarNumerosDePagina = () => {
      const totalPages = pdf.internal.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        //pdf.text(`Página ${i} de ${totalPages}`, pdf.internal.pageSize.getWidth() - 135, pdf.internal.pageSize.getHeight() - 10);
        pdf.text(
          `Página ${i} de ${totalPages}`,
          pdf.internal.pageSize.getWidth() - 40,
          pdf.internal.pageSize.getHeight() - 10
        );
      }
    };

    let total = 0;
    const totalE = data.map((item) => (total += item.cantidad));
    const fechaHoraActual = new Date();

    // Obtener la fecha actual en formato de cadena (por ejemplo, "2023-10-06")
    const fechaActual = fechaHoraActual.toISOString().split("T")[0];

    // Obtener la hora actual en formato de cadena (por ejemplo, "15:30:00")
    const horaActual = fechaHoraActual.toLocaleTimeString();

    const dataForTable = data.map((item) => [
      item.cantidad,
      formatFecha(item.fecha),
      item.descripcion,
    ]);

    //const fechaParaTitulo = dataForTable[0][1];
    //document.title = `Reporte de Ventas - ${fechaParaTitulo}`;

    pdf.addImage(logo, "PNG", 10, 10, 40, 12); // Ajusta las coordenadas (10, 10) y las dimensiones (40, 40) según tus necesidades
    //pdf.text("Paletería la Michoacana", 60, 15);
    //pdf.text("Mi reporte PDF con tabla", 60, 22);
    //pdf.text(`Fecha: ${fechaActual} Hora:${horaActual}`, 120, 30);
    //pdf.text(`el total es ${total}`, 60, 30)

    pdf.setFont("Times New Roman");
    pdf.setFontSize(14);
    pdf.text("Reporte de Ventas - Paletería la Michoacana", 60, 25);

    const pieDePagina = `Fecha de Impresion: ${fechaActual} Hora: ${horaActual}`;
    pdf.setFontSize(10);
    pdf.text(pieDePagina, 10, pdf.internal.pageSize.getHeight() - 10);

    pdf.setFontSize(12);
    function formatFecha(fechaString) {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(fechaString).toLocaleString(undefined, options);
    }

    // Configurar las dimensiones de la tabla
    const margin = 20; // Márgenes más amplios

    const tableWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const tableHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
    const yStart = 40;

    // Dibujar la tabla
    autoTable(pdf, {
      startY: yStart,
      head: [["Cantidad", "Fecha", "Descripción"]],
      body: dataForTable,
      theme: "grid", // Utiliza un tema de cuadrícula para bordes formales
      styles: { halign: "center" }, // Alineación central del texto
      margin: { top: margin, bottom: margin },
    });

    /*
    autoTable(pdf, {
      startY: yStart,
      head: [["Cantidad", "Fecha", "Descripcion"]],
      body: dataForTable, // Excluir la fila de encabezado
      margin: { top: margin, bottom: margin },
    });
*/
    // Guardar o mostrar el PDF (dependiendo de lo que quieras hacer)
    // pdf.save('reporte.pdf'); // Guardar el PDF en el sistema de archivos del usuario

    // Agregar números de página después de que se haya generado el contenido
    agregarNumerosDePagina();

    // Mostrar el PDF en una nueva ventana del navegador
    pdf.output("dataurlnewwindow");
  };

  return (
    <div>
      <button
        class="bg-gradient-to-r from-emerald-400 to-pink-400 rounded-md font-bold text-gray-900 ml-5 px-4 py-2 hover:from-pink-400 hover:to-emerald-400"
        onClick={generarPDF}
      >
        Generar PDF
      </button>
    </div>
  );
}

export default ReportePDF;
