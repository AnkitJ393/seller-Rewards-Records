
import Button from '../Button';
import './Table.css'
import PropTypes from 'prop-types';

const TotalRewards = ({ totalRewardsPerUser,changePage,currentPage,totalPages }) => {
  return (
    <div className='tableContainer'>
      <h1 className='tableHeading'>Total Rewards</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Rewards Points</th>
          </tr>
        </thead>
        <tbody>
          {totalRewardsPerUser.map((totalRewards) => (
            <tr className='rowHover' key={totalRewards.transaction_Id} >
              <td>{totalRewards.customer_name}</td>
              <td className="number-align">{totalRewards.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button changePage={changePage} totalPages={totalPages} currentPage={currentPage}/>
    </div>
  );
};


TotalRewards.propTypes = {
  totalRewardsPerUser: PropTypes.arrayOf(
    PropTypes.shape({
      transaction_Id: PropTypes.string.isRequired,
      customerId: PropTypes.number.isRequired,
      customer_name: PropTypes.string.isRequired,
      purchase_date: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};


export default TotalRewards;
