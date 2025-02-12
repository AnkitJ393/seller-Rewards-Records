import { useEffect, useMemo, useState } from 'react';
import fetchTransactions from './services/fetchTransactions';
import './App.css';
import { rewardPointsDataPerTransaction, sortDataByCustomerId, sortDataByDate } from './utils/helpers';
import TransactionPage from './Pages/TransactionPage';
import UserMonthlyPage from './Pages/UserMonthlyPage';
import TotalRewardsPage from './Pages/TotalRewardsPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        const rewardPointsPerTransaction = rewardPointsDataPerTransaction(data); // Adding the rewards points earned per transaction according to the price
        setTransactionData(rewardPointsPerTransaction);
      } catch (error) {
        setError(`Failed to fetch transaction data. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  const sortedByCustomerId = useMemo(() => sortDataByCustomerId(transactionData), [transactionData]);
  const sortedByDate = useMemo(() => sortDataByDate(transactionData), [transactionData]);


  if (loading) return <div className="loading">Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Merchant Reward Records</h1>
        <div className="Rewards">
          <UserMonthlyPage transactionData={sortedByCustomerId} />
          <TotalRewardsPage transactionData={sortedByCustomerId} />
        </div>
        <TransactionPage transactionData={sortedByDate} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
