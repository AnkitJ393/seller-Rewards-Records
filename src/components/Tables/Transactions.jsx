import Button from '../Button';
import './Table.css';
import PropTypes from 'prop-types';
import {format} from 'date-fns'

const Transactions = ({ totalPages, transactionData,currentPage ,changePage}) => {
  return (
    <div className='tableContainer'>
      <h1 className='tableHeading'>Transactions</h1>
      <table className='table'>
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
            <tr className='rowHover' key={transaction.transaction_Id}>
              <td>{transaction.transaction_Id}</td>
              <td>{transaction.customer_name}</td>
              <td>{format(new Date(transaction.purchase_date),'MMM dd yyyy')}</td>
              <td>{transaction.product_purchased}</td>
              <td className="number-align">${transaction.price}</td>
              <td className="number-align">{transaction.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <Button changePage={changePage} totalPages={totalPages} currentPage={currentPage}/>
    </div>
  );
};


Transactions.propTypes = {
  transactionData: PropTypes.arrayOf(
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

export default Transactions;
