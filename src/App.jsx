import { useEffect, useState } from 'react';
import data from '../data/dataset';
import './App.css';
import UserMonthly from './components/userMonthly/UserMonthly';
import TotalRewards from './components/totalRewards/TotalRewards';
import Transactions from './components/transactions/Transactions';
import { removingDuplicateCustomers, rewardPointsData, sortDataByDate } from '../utils';
import usePagination from '../hooks/usePagination';

function App() {
  const [combineUserMonthRewards, setCombineUserMonthRewards] = useState([]);

  const transactionsPerPage = 10;
  const userMonthlyPerPage = 7;

  const transactionPagination = usePagination(data, transactionsPerPage);
  const combinedRewardsPagination = usePagination(combineUserMonthRewards, userMonthlyPerPage);
  const totalRewardsPagination = usePagination(combineUserMonthRewards, userMonthlyPerPage);

  const calculateRewardPoints = () => {
    const rewardPointsPerTransaction = rewardPointsData(data);
    sortDataByDate(rewardPointsPerTransaction);
    return rewardPointsPerTransaction;
  };

  const initializeCombineUserMonthRewards = () => {
    const rewardPointsPerTransaction = calculateRewardPoints();
    const rewards = removingDuplicateCustomers(rewardPointsPerTransaction).filter(Boolean);
    sortDataByDate(rewards);
    setCombineUserMonthRewards(rewards);
  };

  useEffect(() => {
    const rewardPointsPerTransaction = calculateRewardPoints();
    transactionPagination.updatePaginatedData(rewardPointsPerTransaction);
  }, [transactionPagination.currentPage]);

  useEffect(() => {
    initializeCombineUserMonthRewards();
  }, []);

  const updatePagination = (pagination, data) => {
    if (data.length > 0) {
      pagination.updatePaginatedData(data);
    }
  };

  useEffect(() => {
    updatePagination(combinedRewardsPagination, combineUserMonthRewards);
  }, [combineUserMonthRewards, combinedRewardsPagination.currentPage]);

  useEffect(() => {
    updatePagination(totalRewardsPagination, combineUserMonthRewards);
  }, [combineUserMonthRewards, totalRewardsPagination.currentPage]);

  const paginationProps = (pagination) => ({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    changePage: pagination.changePage,
  });

  return (
    <div className="App">
      <h1>Merchant Reward Records</h1>
      <div className="Rewards">
        <UserMonthly
          userRewards={totalRewardsPagination.paginatedData}
          {...paginationProps(totalRewardsPagination)}
        />
        <TotalRewards
          totalRewardsPerUser={combinedRewardsPagination.paginatedData}
          {...paginationProps(combinedRewardsPagination)}
        />
      </div>
      <Transactions
        transactionData={transactionPagination.paginatedData}
        {...paginationProps(transactionPagination)}
      />
    </div>
  );
}

export default App;
