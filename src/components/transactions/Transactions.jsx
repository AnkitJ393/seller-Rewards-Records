import React, { useEffect, useState } from 'react';
import styles from '../Table.module.css';

const Transactions = ({ totalPages, transactionData,currentPage ,changePage}) => {

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.tableHeading}>Transactions</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction) => (
            <tr className={styles.rowHover} key={transaction.transaction_Id}>
              <td>{transaction.transaction_Id}</td>
              <td>{transaction.customer_name}</td>
              <td>{transaction.purchase_date.slice(4)}</td>
              <td>{transaction.product_purchased}</td>
              <td>${transaction.price}</td>
              <td>{transaction.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
      Page {currentPage} of {totalPages}
      </p>
         
    <div className={styles.buttonContainer}>
        {currentPage>1 && <button className={styles.button} onClick={() => changePage('prev')} >
            Previous
        </button>}
        {(currentPage < totalPages) &&<button className={styles.button} onClick={() => changePage('next')}>
            Next
        </button>}
      </div>
    </div>
  );
};

export default Transactions;
