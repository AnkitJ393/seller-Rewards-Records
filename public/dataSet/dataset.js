import { faker } from '@faker-js/faker'; // Use correct import for faker-js

//  This file is not supposed to be used only requied to be used when needed to Generate new data and put it in the Data.json
const generateFakeData = (numEntries = 20) => {
  const data = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));

  const alreadyRepeatedCustomers = [
    { customerName: "John Doe", customerId: 1 },
    { customerName: "Jane Smith", customerId: 2 },
    { customerName: "Alice Johnson", customerId: 3 },
    { customerName: "Bob Brown", customerId: 4 },
    { customerName: "Andy Mayer", customerId: 5 },
    { customerName: "Evangeline Douglas", customerId: 6 },
    { customerName: "Rosie Manet", customerId: 7 },
    { customerName: "Cindy Mayer", customerId: 8 },
  ];

  for (let i = 0; i < numEntries; i++) {
    const isDuplicate = Math.random() > 0.5; 

    let customer;
    if (isDuplicate) {
      customer = alreadyRepeatedCustomers[Math.floor(Math.random() * alreadyRepeatedCustomers.length)];
    } else {
      // Create a new customer and add to the alreadyRepeatedCustomers array
      const newCustomerName = faker.person.firstName() + " " + faker.person.lastName();
      const newCustomerId = alreadyRepeatedCustomers.length + 1; // Increment ID
      customer = { customerName: newCustomerName, customerId: newCustomerId };
      alreadyRepeatedCustomers.push(customer);
    }

    // Add transaction to the data array
    data.push({
      transaction_Id: faker.string.uuid(),
      customerId: customer.customerId,
      customer_name: customer.customerName,
      purchase_date: faker.date.between({ from: threeMonthsAgo, to: Date.now() }).toISOString(),
      product_purchased: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 0, max: 400, dec: Math.random() > 0.4 ? 0 : 2 })),
    });
  }

  return data;
};


const data = generateFakeData(90);

export default data;
