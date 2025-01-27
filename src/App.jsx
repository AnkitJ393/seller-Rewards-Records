import { useEffect, useState } from 'react';
import data from '../data/dataset'; // Importing dataset
import './App.css'; // Importing styles
import UserMonthly from './components/userMonthly/UserMonthly';
import TotalRewards from './components/totalRewards/TotalRewards';
import Transactions from './components/transactions/Transactions';
import { removingDuplicateCustomers, rewardPointsData, sortDataByDate } from '../utils'; // Utility functions
import usePagination from '../hooks/usePagination'; // Custom pagination hook

function App() {
  const [combineUserMonthRewards, setCombineUserMonthRewards] = useState([]); // State for aggregated rewards

  // Items per page for each table
  const transactionsPerPage = 10;
  const userMonthlyPerPage = 7;

  // Pagination for tables
  const transactionPagination = usePagination(data, transactionsPerPage);
  const combinedRewardsPagination = usePagination(combineUserMonthRewards, userMonthlyPerPage);
  const totalRewardsPagination = usePagination(combineUserMonthRewards, userMonthlyPerPage);

  // Calculate reward points for each transaction and sort by date
  const calculateRewardPoints = () => {
    const rewardPointsPerTransaction = rewardPointsData(data);
    sortDataByDate(rewardPointsPerTransaction);
    return rewardPointsPerTransaction;
  };

  // Initialize combined user monthly rewards by removing duplicates and sorting
  const initializeCombineUserMonthRewards = () => {
    const rewardPointsPerTransaction = calculateRewardPoints();
    const rewards = removingDuplicateCustomers(rewardPointsPerTransaction).filter(Boolean);
    sortDataByDate(rewards);
    setCombineUserMonthRewards(rewards);
  };

  // Update transaction table data when the current page changes
  useEffect(() => {
    const rewardPointsPerTransaction = calculateRewardPoints();
    transactionPagination.updatePaginatedData(rewardPointsPerTransaction);
  }, [transactionPagination, transactionPagination.currentPage]);

  // Initialize combined user monthly rewards on component mount
  useEffect(() => {
    initializeCombineUserMonthRewards();
  }, []);

  // Update paginated data for a table if its data changes
  const updatePagination = (pagination, data) => {
    if (data.length > 0) {
      pagination.updatePaginatedData(data);
    }
  };

  // Update User Monthly table pagination on page or data change
  useEffect(() => {
    updatePagination(combinedRewardsPagination, combineUserMonthRewards);
  }, [combineUserMonthRewards, combinedRewardsPagination, combinedRewardsPagination.currentPage]);

  // Update Total Rewards table pagination on page or data change
  useEffect(() => {
    updatePagination(totalRewardsPagination, combineUserMonthRewards);
  }, [combineUserMonthRewards, totalRewardsPagination, totalRewardsPagination.currentPage]);

  // Extract pagination props for cleaner component usage
  const paginationProps = (pagination) => ({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    changePage: pagination.changePage,
  });

  return (
    <div className="App">
      <h1>Merchant Reward Records</h1>
      <div className="Rewards">
        {/* User Monthly Rewards Table */}
        <UserMonthly
          userRewards={totalRewardsPagination.paginatedData}
          {...paginationProps(totalRewardsPagination)}
        />
        {/* Total Rewards Table */}
        <TotalRewards
          totalRewardsPerUser={combinedRewardsPagination.paginatedData}
          {...paginationProps(combinedRewardsPagination)}
        />
      </div>
      {/* Transactions Table */}
      <Transactions
        transactionData={transactionPagination.paginatedData}
        {...paginationProps(transactionPagination)}
      />
    </div>
  );
}

export default App;
