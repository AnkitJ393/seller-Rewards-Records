import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import UserMonthly from "../components/Tables/UserMonthly";
import PropTypes from "prop-types";
import { aggregatingMonthlyRewardsForCustomer } from "../utils/helpers";

const UserMonthlyPage = ({ transactionData }) => {
  const [userMonthlyRewards, setUserMonthlyRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    paginatedData,
    currentPage,
    changePage,
    totalPages,
    updatePaginatedData
  } = usePagination(userMonthlyRewards);

  useEffect(() => {
    if (transactionData.length > 0) {
      const aggregatingMonthlyRewardsPerUser = aggregatingMonthlyRewardsForCustomer(transactionData);
      setUserMonthlyRewards(aggregatingMonthlyRewardsPerUser);
      setLoading(false);
    }
  }, [transactionData]);

  useEffect(() => {
    if (userMonthlyRewards.length > 0) {
      updatePaginatedData(userMonthlyRewards);
    }
  }, [userMonthlyRewards, currentPage]);  // Only run when userMonthlyRewards or currentPage change

  return (
    loading ? <div>Loading...</div> : (
      <UserMonthly
        userRewards={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />
    )
  );
};

UserMonthlyPage.propTypes = {
  transactionData: PropTypes.arrayOf(
    PropTypes.shape({
      transaction_Id: PropTypes.string.isRequired,
      customerId: PropTypes.number.isRequired,
      customer_name: PropTypes.string.isRequired,
      purchase_date: PropTypes.string.isRequired,
      product_purchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default UserMonthlyPage;
