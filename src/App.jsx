import { useEffect, useState } from 'react';
import data from '../data/dataset';
import './App.css'; 
import UserMonthly from './components/userMonthly/UserMonthly';
import TotalRewards from './components/totalRewards/TotalRewards';
import Transactions from './components/transactions/Transactions';
import { aggregatingMonthlyRewardsForCustomer,totalRewardsUser, rewardPointsData, sortDataByDate } from '../utils'; // Utility functions
import usePagination from '../hooks/usePagination'; // Custom pagination hook

function App() {
  const [combineUserMonthRewards, setCombineUserMonthRewards] = useState([]); 
  const [totalRewardsPerUser,setTotalRewardsPerUser]=useState([]);

  // Items per page for each table
  const transactionsPerPage = 10;
  const userMonthlyPerPage = 7;

  // Pagination for tables
  const transactionPagination = usePagination(data, transactionsPerPage);
  const combinedRewardsPagination = usePagination(combineUserMonthRewards, userMonthlyPerPage);
  const totalRewardsPagination = usePagination(totalRewardsPerUser, userMonthlyPerPage);

  // Calculate reward points for each transaction and sort by date
  const calculateRewardPoints = () => {
    const rewardPointsPerTransaction = rewardPointsData(data);
    sortDataByDate(rewardPointsPerTransaction);
    return rewardPointsPerTransaction;
  };

  // Initialize combined user monthly rewards by removing duplicates and sorting
  const initializeCombineUserMonthRewards = () => {
    const rewardPointsPerTransaction = calculateRewardPoints();
    const userMonthlyRewards = sortDataByDate(aggregatingMonthlyRewardsForCustomer(rewardPointsPerTransaction).filter(Boolean));
    const totalRewards =sortDataByDate(totalRewardsUser(rewardPointsPerTransaction).filter(Boolean));
      
    setCombineUserMonthRewards(userMonthlyRewards);
    setTotalRewardsPerUser(totalRewards);
  };

  // Update transaction table data when the current page changes
  useEffect(() => {
    const rewardPointsPerTransaction = calculateRewardPoints();
    transactionPagination.updatePaginatedData(rewardPointsPerTransaction);
  }, [ transactionPagination.currentPage]);

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
  }, [combineUserMonthRewards, combinedRewardsPagination.currentPage]);

  // Update Total Rewards table pagination on page or data change
  useEffect(() => {
    updatePagination(totalRewardsPagination, totalRewardsPerUser);
  }, [totalRewardsPerUser, totalRewardsPagination.currentPage]);

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
          userRewards={combinedRewardsPagination.paginatedData}
          {...paginationProps(combinedRewardsPagination)}
        />
        {/* Total Rewards Table */}
        <TotalRewards
          totalRewardsPerUser={totalRewardsPagination.paginatedData}
          {...paginationProps(totalRewardsPagination)}
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
