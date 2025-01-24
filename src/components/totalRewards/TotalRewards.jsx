import React from 'react';
import styles from '../Table.module.css';

const TotalRewards = ({ totalRewardsPerUser,changePage,currentPage,totalPages }) => {
  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.tableHeading}>Total Rewards</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Rewards Points</th>
          </tr>
        </thead>
        <tbody>
          {totalRewardsPerUser.map((totalRewards, index) => (
            <tr className={styles.rowHover} key={index} >
              <td>{totalRewards.customer_name}</td>
              <td>{totalRewards.rewardPoints}</td>
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

export default TotalRewards;
