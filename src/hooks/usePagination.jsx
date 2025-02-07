import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_RECORDS_PER_PAGE } from '../utils/constants';

const usePagination = (data, itemsPerPage = DEFAULT_RECORDS_PER_PAGE) => {
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
