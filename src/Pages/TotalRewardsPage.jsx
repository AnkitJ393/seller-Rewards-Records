import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import PropTypes from "prop-types";
import { totalRewardsPerPage } from "../utils/constants";
import { totalRewardsUser } from "../utils/utils";
import TotalRewards from "../components/TotalRewards";

const TotalRewardsPage = ({transactionData}) => {
    const [totalRewardsPerUser,setTotalRewardsPerUser]=useState([]);
    const [loading,setLoading]=useState(true);
    
    const totalRewardsPagination=usePagination(totalRewardsPerUser,totalRewardsPerPage);

    useEffect(()=>{
        if(transactionData.length>0){
            const totalRewardsForEachUser=totalRewardsUser(transactionData).filter(Boolean); // Total Reward per user and filtered the array if no element remains Null
            setTotalRewardsPerUser(totalRewardsForEachUser);
            setLoading(false);
        }
    },[transactionData])

    useEffect(()=>{
        if(totalRewardsPerUser.length>0){
            totalRewardsPagination.updatePaginatedData(totalRewardsPerUser); // slicing the total reward per user data for Pagination
        }
    },[totalRewardsPagination.currentPage,totalRewardsPerUser])

  return (
    loading ? 'Loading...':
    <TotalRewards 
        totalRewardsPerUser={totalRewardsPagination.paginatedData}
        currentPage={totalRewardsPagination.currentPage}
        changePage={totalRewardsPagination.changePage}
        totalPages={totalRewardsPagination.totalPages}
    />
  )
}

TotalRewardsPage.propTypes={
    transactionData:PropTypes.arrayOf(
         PropTypes.shape({
              transaction_Id: PropTypes.string.isRequired,
              customerId: PropTypes.string.isRequired,
              customer_name: PropTypes.string.isRequired,
              purchase_date: PropTypes.string.isRequired,
              product_purchased: PropTypes.string.isRequired,
              price: PropTypes.number.isRequired,
              rewardPoints: PropTypes.number.isRequired,
            })
          ).isRequired,
}

export default TotalRewardsPage