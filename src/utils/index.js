// utils.js - Reward Calculation

export const calculatePoints = (amount) => {
  let points = 0;
  const roundedAmount = Math.floor(amount);

  if (roundedAmount > 100) {
    points += (roundedAmount - 100) * 2;
  }
  if (roundedAmount > 50) {
    points += roundedAmount - 50;
  }
  return points;
};

export const calculateRewards = (transactions) => {
  const rewards = transactions.reduce((acc, val) => {
    const month = new Date(val?.date).toLocaleString('default', {
      month: 'long',
    });
    const year = new Date(val?.date).getFullYear();
    const key = `${month} ${year}`;

    if (!acc[val?.customerId]) {
      acc[val?.customerId] = {
        customerId: val?.customerId,
        name: val?.customer,
        date: val?.date,
        total: 0,
        monthly: {},
      };
    }

    if (!acc[val.customerId].monthly[key]) {
      acc[val.customerId].monthly[key] = 0;
    }

    const points = calculatePoints(val.amount);
    acc[val.customerId].monthly[key] += points;
    acc[val.customerId].total += points;

    return acc;
  }, {});

  return Object.values(rewards);
};
