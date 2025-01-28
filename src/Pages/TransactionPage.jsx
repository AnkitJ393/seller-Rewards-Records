import { useEffect, useState } from "react"; 
import PropTypes from "prop-types"; 
import usePagination from "../hooks/usePagination";
import { transactionsPerPage } from "../utils/constants";
import Transactions from "../components/Transactions";

const TransactionPage = ({ transactionData }) => {
  const [loading, setLoading] = useState(true);
  const transactionPagination = usePagination(transactionData, transactionsPerPage);

  useEffect(() => {
    if (transactionData.length > 0) {
      transactionPagination.updatePaginatedData(transactionData);// function call in custom Hook to slice the data for pagination
      setLoading(false);
    }
  }, [transactionPagination.currentPage, transactionData]);

  return (
    loading ? 'Loading...' : (
      <Transactions
        transactionData={transactionPagination.paginatedData}
        currentPage={transactionPagination.currentPage}
        totalPages={transactionPagination.totalPages}
        changePage={transactionPagination.changePage}
      />
    )
  );
};

TransactionPage.propTypes = {
  transactionData: PropTypes.arrayOf(
    PropTypes.shape({
      transaction_Id: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      customer_name: PropTypes.string.isRequired,
      purchase_date: PropTypes.string.isRequired,
      product_purchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionPage;
