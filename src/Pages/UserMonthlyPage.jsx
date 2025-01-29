import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { USER_MONTHLY_RECORDS_PER_PAGE } from "../utils/constants";
import UserMonthly from "../components/Tables/UserMonthly";
import PropTypes from "prop-types";
import { aggregatingMonthlyRewardsForCustomer } from "../utils/helpers";

const UserMonthlyPage = ({ transactionData }) => {
  const [userMonthlyRewards, setUserMonthlyRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const userMonthlyPagination = usePagination(userMonthlyRewards, USER_MONTHLY_RECORDS_PER_PAGE);

  useEffect(() => {
    if (transactionData.length > 0) {
      const aggregatingMonthlyRewardsPerUser = aggregatingMonthlyRewardsForCustomer(transactionData).filter(Boolean);
      setUserMonthlyRewards(aggregatingMonthlyRewardsPerUser);
      setLoading(false);
    }
  }, [transactionData]);

  useEffect(() => {
    if (userMonthlyRewards.length > 0) {
      userMonthlyPagination.updatePaginatedData(userMonthlyRewards);
    }
  }, [userMonthlyRewards, userMonthlyPagination.currentPage]);  // Only run when userMonthlyRewards or currentPage change

  return loading ? 'Loading...' : (
    <UserMonthly
      userRewards={userMonthlyPagination.paginatedData}
      currentPage={userMonthlyPagination.currentPage}
      totalPages={userMonthlyPagination.totalPages}
      changePage={userMonthlyPagination.changePage}
    />
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
