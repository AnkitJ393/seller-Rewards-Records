
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
  
  export const removingDuplicateCustomers = (userData) => {
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
  
  export const sortDataByDate = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.purchase_date);
      const dateB = new Date(b.purchase_date);
  
      return dateA - dateB;
    });
  };
  