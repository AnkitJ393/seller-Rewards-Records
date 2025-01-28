import Button from './Button';
import  './Table.css';
import PropTypes from "prop-types";

const UserMonthly = ({ userRewards,changePage,currentPage,totalPages }) => {

  return (
    <div className='tableContainer'>
      <h1 className='tableHeading'>User Monthly Rewards</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Month</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {userRewards.map((userReward) => (
            <tr className='rowHover' key={userReward.transaction_Id}>
              <td>{userReward.customerId}</td>
              <td>{userReward.customer_name}</td>
              <td>{userReward.purchase_date.slice(4, 8) + " " + userReward.purchase_date.slice(-4)}</td>
              <td>{userReward.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>         
      <Button changePage={changePage} totalPages={totalPages} currentPage={currentPage}/>
    </div>
  );
};


UserMonthly.propTypes = {
  userRewards: PropTypes.arrayOf(
    PropTypes.shape({
      transaction_Id: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      customer_name: PropTypes.string.isRequired,
      purchase_date: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
export default UserMonthly;
