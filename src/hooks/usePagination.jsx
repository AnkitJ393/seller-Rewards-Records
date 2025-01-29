import { useCallback, useMemo, useState } from 'react';

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

  /**
   * Updates the paginated data based on the current page and items per page.
   * 
   * @param {Array} newData - The full data array to paginate.
   */
  const updatePaginatedData = useCallback(
    (newData) => {
      setPaginatedData(
        newData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      );
    },
    [currentPage, itemsPerPage]
  );

  /**
   * Changes the current page based on the direction (next or prev).
   * 
   * @param {string} direction - The direction to change the page, either 'next' or 'prev'.
   */
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

  return { currentPage, totalPages, changePage, paginatedData, updatePaginatedData };
};

export default usePagination;
