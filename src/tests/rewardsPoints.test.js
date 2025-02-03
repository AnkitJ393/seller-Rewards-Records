import { calculateRewards, sortDataByDate, rewardPointsDataPerTransaction, totalRewardsUser, aggregatingMonthlyRewardsForCustomer } from '../utils/helpers';
  
  describe('calculateRewards', () => {
    it('should return the correct rewards points when the price is greater than 100', () => {
      expect(calculateRewards(200)).toBe(250); // (200-100)*2 + 50 = 250
    });
  
    it('should return the correct rewards points when the price is less than 100', () => {
      expect(calculateRewards(70)).toBe(20); // 70-50=20
    });
  
    it('should return 0 rewards points when the price is 50 or less', () => {
      expect(calculateRewards(40)).toBe(0); // 0 reward points for prices below 50
    });
  
    it('should return 0 when price is NaN', () => {
      expect(calculateRewards(NaN)).toBe(0); // Handles invalid inputs like NaN
    });
  
    it('should return 0 when price is undefined', () => {
      expect(calculateRewards(undefined)).toBe(0); // Handles undefined input
    });
  
    it('should return 0 when price is null', () => {
      expect(calculateRewards(null)).toBe(0); // Handles null input
    });
  });
  
  describe('sortDataByDate', () => {
    it('should sort the data by purchase_date in ascending order', () => {
      const data = [
        {
          "transaction_Id": "90c30ffd-546d-46d8-b5a0-27b1a57de64e",
          "customerId": 10,
          "customer_name": "Joe Pfannerstill",
          "purchase_date": "2024-12-29T10:55:15.302Z",
          "product_purchased": "Generic Wooden Shoes",
          "price": 250
        },
        {
          "transaction_Id": "c64298a2-0e34-41dd-b008-1f4b9ea0d677",
          "customerId": 9,
          "customer_name": "Albertha Schneider",
          "purchase_date": "2024-11-24T10:48:06.599Z",
          "product_purchased": "Oriental Bamboo Shoes",
          "price": 128.49
        },
        {
          "transaction_Id": "c881ce12-bc1a-47b7-9a19-9e0b0835d6ad",
          "customerId": 11,
          "customer_name": "Theodore Hane",
          "purchase_date": "2024-12-03T05:56:09.372Z",
          "product_purchased": "Unbranded Steel Pants",
          "price": 176
        }
      ];
  
      const sortedDataByDate = sortDataByDate(data);
  
      expect(sortedDataByDate[0].customer_name).toBe('Albertha Schneider'); // The earliest date should come first
      expect(sortedDataByDate[1].customer_name).toBe('Theodore Hane');
      expect(sortedDataByDate[2].customer_name).toBe('Joe Pfannerstill');
    });
  });
  
  describe('rewardPointsDataPerTransaction', () => {
    it('should return transactions with calculated reward points sorted by date', () => {
      const data = [
        {
          "transaction_Id": "90c30ffd-546d-46d8-b5a0-27b1a57de64e",
          "customerId": 10,
          "customer_name": "Joe Pfannerstill",
          "purchase_date": "2024-12-29T10:55:15.302Z",
          "product_purchased": "Generic Wooden Shoes",
          "price": 250
        },
        {
          "transaction_Id": "c64298a2-0e34-41dd-b008-1f4b9ea0d677",
          "customerId": 9,
          "customer_name": "Albertha Schneider",
          "purchase_date": "2024-11-24T10:48:06.599Z",
          "product_purchased": "Oriental Bamboo Shoes",
          "price": 128.49
        },
        {
          "transaction_Id": "c881ce12-bc1a-47b7-9a19-9e0b0835d6ad",
          "customerId": 11,
          "customer_name": "Theodore Hane",
          "purchase_date": "2024-12-03T05:56:09.372Z",
          "product_purchased": "Unbranded Steel Pants",
          "price": 30
        }
      ];
  
      const result = rewardPointsDataPerTransaction(data);
  
      expect(result[0].rewardPoints).toBe(106); // (128-100)*2+50 = 106
      expect(result[1].rewardPoints).toBe(0);
      expect(result[2].rewardPoints).toBe(350); // (250-100)*2 + 50 = 350
  
      expect(result[0].purchase_date).toBe('2024-11-24T10:48:06.599Z'); // Sorted by purchase_date
      expect(result[1].purchase_date).toBe('2024-12-03T05:56:09.372Z');
      expect(result[2].purchase_date).toBe('2024-12-29T10:55:15.302Z');
    });
  });
  
  describe('totalRewardsUser', () => {
    it('should calculate total rewards for each user', () => {
      const userData=[
            {
                "transaction_Id": "1f8d1737-2fa8-4b29-9cc1-3df1d663e774",
                "customerId": 1,
                "customer_name": "John Doe",
                "purchase_date": "2024-11-03T17:46:46.835Z",
                "product_purchased": "Small Silk Ball",
                "price": 100.29,
                "rewardPoints": 50
            },
            {
                "transaction_Id": "98ed4ed1-7c4f-41cd-a14a-f641e0a67db4",
                "customerId": 4,
                "customer_name": "Bob Brown",
                "purchase_date": "2025-01-19T00:10:28.047Z",
                "product_purchased": "Generic Bamboo Soap",
                "price": 386,
                "rewardPoints": 622
            },
            {
                "transaction_Id": "1aade410-7dd9-4844-93f8-9070cdf55877",
                "customerId": 4,
                "customer_name": "Bob Brown",
                "purchase_date": "2024-12-07T17:53:57.766Z",
                "product_purchased": "Licensed Cotton Bacon",
                "price": 464.45,
                "rewardPoints": 628
            },
        ]
  
      const result = totalRewardsUser(userData);
  
      expect(result.length).toBe(2); // Two unique users
      expect(result[0].rewardPoints).toBe(50); // customerId 1 total rewards = 50
      expect(result[1].rewardPoints).toBe(1250); // customerId 4 total rewards = 622+628 = 1250
    });
  });
  
  describe('aggregatingMonthlyRewardsForCustomer', () => {
    it('should aggregate total rewards for each user for each month', () => {
      const userData=[
            {
                "transaction_Id": "1f8d1737-2fa8-4b29-9cc1-3df1d663e774",
                "customerId": 1,
                "customer_name": "John Doe",
                "purchase_date": "2024-11-03T17:46:46.835Z",
                "product_purchased": "Small Silk Ball",
                "price": 100.29,
                "rewardPoints": 50
            },
            {
                "transaction_Id": "98ed4ed1-7c4f-41cd-a14a-f641e0a67db4",
                "customerId": 4,
                "customer_name": "Bob Brown",
                "purchase_date": "2025-01-19T00:10:28.047Z",
                "product_purchased": "Generic Bamboo Soap",
                "price": 386,
                "rewardPoints": 622
            },
            {
                "transaction_Id": "1aade410-7dd9-4844-93f8-9070cdf55877",
                "customerId": 4,
                "customer_name": "Bob Brown",
                "purchase_date": "2024-12-07T17:53:57.766Z",
                "product_purchased": "Licensed Cotton Bacon",
                "price": 464.45,
                "rewardPoints": 628
            },
            {
                "transaction_Id": "1aade410-7dd9-4844-93f8-9070cdf55877",
                "customerId": 4,
                "customer_name": "Bob Brown",
                "purchase_date": "2024-12-27T17:53:57.766Z",
                "product_purchased": "Licensed Cotton Bacon",
                "price": 120,
                "rewardPoints":90 
            }
            
        ]
  
      const result = aggregatingMonthlyRewardsForCustomer(userData);
      
      expect(result.length).toBe(3); // Three unique (customerId, month) pairs
      expect(result[0].rewardPoints).toBe(50); // John Doe (Nov 2024) total = 50
      expect(result[1].rewardPoints).toBe(622); // Bob Brown (Jan 2025) = 622
      expect(result[2].rewardPoints).toBe(718); // Bob Brown (Dec 2024) = 628+90 = 718
    });
  });
  