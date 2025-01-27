
export const calculateRewards = (price) => {
    let total = 0;
    if (price > 100) {
      total = (price - 100) * 2 + 50;
    } else if (price > 50) {
      total = price - 50;
    }
    return total;
  };
  
  export const rewardPointsData = (rewardsData) => {
    return rewardsData.map((rewardData) => {
      const rewardPoint = calculateRewards(parseInt(rewardData.price));
      return {
        ...rewardData,
        rewardPoints: rewardPoint,
      };
    });
  };
  
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
        const monthYear = purchase_date.slice(4, 7) + " " + purchase_date.slice(-4);
        const key = `${customerId}_${monthYear}`;
  
        // Check if key already exists in the accumulator
        if (!acc[key]) {
          acc[key] = {
            transaction_Id,
            customerId,
            customer_name,
            purchase_date,
            product_purchased,
            price: parseFloat(price),
            rewardPoints,
          };
        } else {
          // Update the existing entry
          acc[key].price += parseFloat(price);
          acc[key].rewardPoints += rewardPoints;
        }
  
        return acc;
      }, {})
    );
  };
  
  
  export const sortDataByDate = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.purchase_date);
      const dateB = new Date(b.purchase_date);
  
      return dateA - dateB;
    });
  };
  