import { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";
import { calculateRewards } from "../utils";

export function useGetTransactionListHook() {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state
  useEffect(() => {
    fetchTransactions((result) => {
      if (result.type === "success") {
        setTransactions(result?.data);
        setRewards(calculateRewards(result?.data));
        setLoading(false);
        setError(null);
      } else {
        setError(result.error || "Something went wrong!");
      }
      setLoading(false);
    });
  }, []);

  return {
    loader: loading,
    transactions,
    rewards,
    error,
  };
}
