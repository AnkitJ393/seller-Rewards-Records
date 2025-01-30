import { useCallback, useMemo, useState } from 'react';

const usePagination = (data, itemsPerPage = 7) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

  const updatePaginatedData = useCallback(
    (newData) => {
      setPaginatedData(
        newData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      );
    },
    [currentPage, itemsPerPage]
  );

  const changePage = useCallback(
    (direction) => {
      if (direction === 'next' && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    },
    [currentPage, totalPages]
  );

  return {
    currentPage,
    totalPages,
    changePage,
    paginatedData,
    updatePaginatedData,
  };
};

export default usePagination;
