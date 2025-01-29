import Button from '../Button';
import  './Table.css';
import PropTypes from "prop-types";
import {format} from 'date-fns'

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
              <td className="number-align">{userReward.customerId}</td>
              <td>{userReward.customer_name}</td>
              <td>{format(new Date(userReward.purchase_date),'MMM yyyy')}</td>
              <td className="number-align">{userReward.rewardPoints}</td>
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
