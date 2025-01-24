import React from 'react';
import styles from '../Table.module.css';

const UserMonthly = ({ userRewards,changePage,currentPage,totalPages }) => {

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.tableHeading}>User Monthly Rewards</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Name</th>
            <th>Month</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {userRewards.map((userReward) => (
            <tr className={styles.rowHover} key={userReward.transaction_Id}>
              <td>{userReward.customerId}</td>
              <td>{userReward.customer_name}</td>
              <td>{userReward.purchase_date.slice(4, 8)}</td>
              <td>{userReward.rewardPoints}</td>
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

export default UserMonthly;
