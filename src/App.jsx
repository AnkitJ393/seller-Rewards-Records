import { useEffect, useState } from 'react';
import fetchTransactions from './utils/services/fetchTransactions';
import './App.css'; 
import {  rewardPointsDataPerTransaction } from './utils/utils';
import TransactionPage from './Pages/TransactionPage';
import UserMonthlyPage from './Pages/UserMonthlyPage';
import TotalRewardsPage from './Pages/TotalRewardsPage';

function App() {
  const [transactionData,setTransactionData]=useState([]);

  useEffect(() => {
    const getTransactions=async ()=>{
      try {
        const data=await fetchTransactions(); 
        const rewardPointsPerTransaction = rewardPointsDataPerTransaction(data)  // adding the rewards points earned per transaction according to the price
        setTransactionData(rewardPointsPerTransaction);
        
      } catch (error) {
        throw new Error(error); 
      }
    }
    getTransactions();
  }, []);


  return (
    <div className="App">
      <h1>Merchant Reward Records</h1>
      <div className="Rewards">
        <UserMonthlyPage
          transactionData={transactionData}         
        />
        <TotalRewardsPage
          transactionData={transactionData}
        />
      </div>
      <TransactionPage
        transactionData={transactionData}
      />
    </div>
  );
}

export default App;
