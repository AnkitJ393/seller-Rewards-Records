
 const sortDataByDate = (data) => {
  return data.sort((a, b) => {
    const dateA = new Date(a.purchase_date);
    const dateB = new Date(b.purchase_date);

    return dateA - dateB;
  });
};

 const calculateRewards = (price) => {
  if (isNaN(price) || price === null || price === undefined) {
    return 0; 
  }
  const actualPrice=Math.floor(price);
  let total = 0;
  if (actualPrice > 100) {
    total = (actualPrice - 100) * 2 + 50;
  } else if (actualPrice > 50) {
    total = actualPrice - 50;
  }
    return total;
  };
  
// Rewards points per Transaction 
  export const rewardPointsDataPerTransaction = (rewardsData) => {
    const calculatedRewardsPerTransaction= rewardsData.map((rewardData) => {
      const rewardPoint = calculateRewards(rewardData.price);
      return {
        ...rewardData,
        rewardPoints: rewardPoint,
      };
    });
    return sortDataByDate(calculatedRewardsPerTransaction);
  };
  
  // Function to Calculate Total Rewards Every User has Earned till date in last 3 months
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
    }, []);
  };


  // Function to Calculate Monthly Rewards of Each User , using a unique key of CustomerID and Month
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
    );
  };
  
  
  