import { useEffect, useState } from "react"; 
import PropTypes from "prop-types"; 
import usePagination from "../hooks/usePagination";
import { TRANSACTIONS_PER_PAGE } from "../utils/constants";
import Transactions from "../components/Tables/Transactions";

const TransactionPage = ({ transactionData }) => {
  const [loading, setLoading] = useState(true);
  const transactionPagination = usePagination(transactionData, TRANSACTIONS_PER_PAGE);

  useEffect(() => {
    if (transactionData.length > 0) {
      transactionPagination.updatePaginatedData(transactionData); // Function call in custom Hook to slice the data for pagination
      setLoading(false);
    }
  }, [transactionPagination.currentPage, transactionData]);

  return (
    loading ? <div>Loading...</div> : (
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
      customerId: PropTypes.number.isRequired,
      customer_name: PropTypes.string.isRequired,
      purchase_date: PropTypes.string.isRequired,
      product_purchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionPage;
