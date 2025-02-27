/* Sort By Date */
export const sortByDate = (data, isAscending) => {
  return isAscending
    ? [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    : [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/* Sort By Customer Id */
export const sortByCustomerId = (data, sortState) => {
  if (sortState === "asc") {
    return [...data].sort((a, b) => a.customerId.localeCompare(b.customerId));
  } else if (sortState === "desc") {
    return [...data].sort((a, b) => b.customerId.localeCompare(a.customerId));
  }
  return data;
};

/* Sort By Rewards Points */
export const sortByRewardPoints = (data, isAscending) => {
  return isAscending
    ? [...data].sort((a, b) => a.totalRewardPoints - b.totalRewardPoints)
    : [...data].sort((a, b) => b.totalRewardPoints - a.totalRewardPoints);
};

/* Filter Last 3 months Transactions */
export const getLastThreeMonthsTransactions = (transactions) => {
  const currentDate = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= threeMonthsAgo && transactionDate <= currentDate;
  });
};

/* Points Calculation */
export const calculatePoints = (amount) => {
  if (typeof amount !== "number" || isNaN(amount) || amount <= 0) return 0;
  let roundedAmount = Math.floor(amount);
  if (roundedAmount > 100) return (roundedAmount - 100) * 2 + 50;
  if (roundedAmount > 50) return roundedAmount - 50;

  return 0;
};

/* Reward Summary */
export const rewardsSummary = (transactions) => {
  const rewards = transactions.reduce((acc, val) => {
    const month = new Date(val?.date).toLocaleString("default", {
      month: "long",
    });
    const year = new Date(val?.date).getFullYear();
    const key = `${val.customerId}-${month}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        customerId: val.customerId,
        name: val.customer,
        month,
        year,
        rewardPoints: 0,
      };
    }

    const points = calculatePoints(val.amount);
    acc[key].rewardPoints += points;

    return acc;
  }, {});

  return Object.values(rewards);
};

/* Calculate Total Rewards */
export const calculateTotalRewards = (transactions) => {
  const rewards = transactions.reduce((acc, val) => {
    if (!acc[val.customerId]) {
      acc[val.customerId] = {
        customerId: val.customerId,
        name: val.customer,
        totalRewardPoints: 0,
      };
    }

    const points = calculatePoints(val.amount);
    acc[val.customerId].totalRewardPoints += points;
    return acc;
  }, {});

  return Object.values(rewards);
};
