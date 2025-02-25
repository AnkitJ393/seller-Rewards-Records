import logger from "../utils/logger";

/**
 * Fetches the transaction data of users from a JSON file.
 * Returns the records of transactions from the last three months.
 * 
 * @async
 * @function fetchTransactions
 * @returns {Promise<Array>} A promise that resolves to an array of transaction data of users from the last three months.
 * @throws {Error} Throws an error if the fetching or parsing fails.
 */
const fetchTransactions = async () => {
    try {
        const response = await fetch('/dataSet/data.json');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        logger.error('Error fetching transactions:', error);
        throw error;
    }
};

export default fetchTransactions;
