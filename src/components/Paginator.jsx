import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';

function Paginator({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const visiblePages = 2; // Cambiar el número de páginas visibles según sea necesario

  // Calcula el rango de páginas visibles
  let start = currentPage - Math.floor(visiblePages / 2);
  start = Math.max(start, 1);
  let end = start + visiblePages - 1;
  end = Math.min(end, totalPages);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-0">
      <ul className="flex justify-end space-x-2">
        <li>
          <button
            className={`px-3 py-2 mt-1 ${
              currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-pink-200 text-black hover:bg-pink-500'
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="flex items-center">
              <TiChevronLeft className="" />
            </span>
          </button>
        </li>
        {start > 1 && (
          <li>
            <button
              className="px-3 py-2 bg-pink-200 text-black hover:bg-pink-500"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
          </li>
        )}
        {start > 2 && (
          <li>
            <span className="px-3 py-2">...</span>
          </li>
        )}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-2 ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'bg-pink-200 text-black hover:bg-pink-500'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {end < totalPages - 1 && (
          <li>
            <span className="px-3 py-2">...</span>
          </li>
        )}
        {end < totalPages && (
          <li>
            <button
              className="px-3 py-2 bg-pink-200 text-black hover:bg-pink-500"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            className={`px-3 py-2 mt-1 ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-600' : 'bg-pink-200 text-black hover:bg-pink-500'
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="flex items-center">
              <TiChevronRight className="" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}


export default Paginator