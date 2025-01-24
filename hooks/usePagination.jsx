import React, { useState } from 'react'

const usePagination = (data,itemsPerPage) => {

    const [currentPage,setCurrentPage]=useState(1);
    const [paginatedData,setPaginatedData]=useState([]);
    
    const totalPages=Math.ceil(data.length/itemsPerPage);

    const updatePaginatedData = (newData) => {
        setPaginatedData(
          newData.slice(
            (currentPage -1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      };
    

    const changePage=(direction)=>{
        if(direction=='next' && currentPage<totalPages){
            setCurrentPage((prev)=>prev+1);
        }
        else if(direction=='prev' && currentPage>1){
            setCurrentPage((prev)=>prev-1);
        }
    }

  
    return {currentPage,totalPages,changePage,paginatedData,updatePaginatedData}
}

export default usePagination