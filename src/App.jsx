import { useEffect, useState } from 'react';
import fetchTransactions from './utils/services/fetchTransactions';
import './App.css';
import { rewardPointsDataPerTransaction } from './utils/helpers';
import TransactionPage from './Pages/TransactionPage';
import UserMonthlyPage from './Pages/UserMonthlyPage';
import TotalRewardsPage from './Pages/TotalRewardsPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches transaction data and adds reward points per transaction.
     * This function is called when the component mounts.
     * 
     * @async
     * @function
     */
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

  if (loading) return <div className="loading">Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Merchant Reward Records</h1>
        <div className="Rewards">
          <UserMonthlyPage transactionData={transactionData} />
          <TotalRewardsPage transactionData={transactionData} />
        </div>
        <TransactionPage transactionData={transactionData} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
