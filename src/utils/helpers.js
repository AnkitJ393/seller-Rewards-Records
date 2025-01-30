/**
 * Sorts the given data array by purchase date in ascending order.
 *
 * @param {Array} data - The array of data to be sorted.
 * @returns {Array} - The sorted array by purchase date.
 */
export const sortDataByDate = (data) => {
  return data.sort((a, b) => {
    const dateA = new Date(a.purchase_date);
    const dateB = new Date(b.purchase_date);

    return dateA - dateB;
  });
};

/**
 * Calculates the reward points based on the given price.
 * 
 * Reward points are calculated as:
 * - If the price is above 100, the total reward points are calculated as (price - 100) * 2 + 50.
 * - If the price is between 50 and 100, the total reward points are calculated as (price - 50).
 * - If the price is below 50, the reward points are 0.
 *
 * @param {number} price - The price of the product purchased.
 * @returns {number} - The calculated reward points for the given price.
 */
export const calculateRewards = (price) => {
  if (isNaN(price) || price === null || price === undefined) {
    return 0; 
  }
  const actualPrice = Math.floor(price);
  let total = 0;
  if (actualPrice > 100) {
    total = ((actualPrice - 100) * 2) + 50;
  } else if (actualPrice > 50) {
    total = actualPrice - 50;
  }
  return total;
};

/**
 * Calculates reward points for each transaction in the rewards data array.
 * 
 * This function maps through the rewards data array, calculates the reward points
 * for each transaction, and returns the sorted data by purchase date.
 *
 * @param {Array} rewardsData - The array of rewards data for each transaction.
 * @returns {Array} - The array of transactions with calculated reward points, sorted by date.
 */
export const rewardPointsDataPerTransaction = (rewardsData) => {
  const calculatedRewardsPerTransaction = rewardsData.map((rewardData) => {
    const rewardPoint = calculateRewards(rewardData.price);
    return {
      ...rewardData,
      rewardPoints: rewardPoint,
    };
  });
  return sortDataByDate(calculatedRewardsPerTransaction);
};

/**
 * Calculates the total rewards earned by each user from all transactions.
 * 
 * This function reduces the user data array into a summary object where each key is a customerId.
 * It aggregates the price and reward points for each user.
 *
 * @param {Array} userData - The array of user transaction data.
 * @returns {Array} - The array of aggregated rewards for each user.
 */
export const totalRewardsUser = (userData) => {
  return userData.reduce((acc, curr) => {
    const {
      customerId,
      customer_name,
      transaction_Id,
      purchase_date,
      product_purchased,
      price,
      rewardPoints,
    } = curr;

    if (!acc[customerId]) {
      acc[customerId] = {
        transaction_Id,
        customerId,
        customer_name,
        purchase_date,
        product_purchased,
        price: parseFloat(price),
        rewardPoints,
      };
    } else {
      acc[customerId].price += parseFloat(price);
      acc[customerId].rewardPoints += rewardPoints;
    }

    return acc;
  }, []).filter(Boolean);
};

/**
 * Aggregates monthly rewards for each user, using a unique key based on customerId and month.
 * 
 * This function reduces the user data array into an object where each key is a combination of customerId and monthYear.
 * It calculates the total price and reward points for each user per month.
 *
 * @param {Array} userData - The array of user transaction data.
 * @returns {Array} - The array of aggregated monthly rewards for each user.
 */
export const aggregatingMonthlyRewardsForCustomer = (userData) => {
  return Object.values(
    userData.reduce((acc, curr) => {
      const {
        customerId,
        customer_name,
        transaction_Id,
        purchase_date,
        product_purchased,
        price,
        rewardPoints,
      } = curr;

      // Generate a unique key based on customerId and monthYear
      const date = new Date(purchase_date);
      const monthYear = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`; // Example: "Nov 2024"

      const key = `${customerId}_${monthYear}`;

      // Check if key already exists in the accumulator
      if (!acc[key]) {
        acc[key] = {
          transaction_Id,
          customerId,
          customer_name,
          purchase_date,
          product_purchased,
          price: price,
          rewardPoints,
        };
      } else {
        // Update the existing entry
        acc[key].price += price;
        acc[key].rewardPoints += rewardPoints;
      }

      return acc;
    }, {})
  ).filter(Boolean);
};
