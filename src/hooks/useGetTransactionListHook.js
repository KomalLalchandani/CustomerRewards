import { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";

import { rewardsSummary, calculateTotalRewards } from "../utils";

export function useGetTransactionListHook() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state
  useEffect(() => {
    fetchTransactions((result) => {
      if (result.type === "success" && result?.data) {
        setTransactions(result.data);
        setMonthlyRewards(rewardsSummary(result.data));
        setTotalRewards(calculateTotalRewards(result.data));
      } else {
        setError(result.error || "Something went wrong!");
      }
      setLoading(false);
    });
  }, []);

  return {
    loader: loading,
    transactions,
    monthlyRewards,
    totalRewards,
    error,
  };
}
