import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';
import { calculateRewards } from '../utils';

export function useGetTransactionListHook() {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions((result) => {
      if (result.type === 'success') {
        setTransactions(result?.data);
        setRewards(calculateRewards(result?.data));
        setLoading(false);
      } else {
        setLoading(false);
        console.error('Error:', result.error);
      }
    });
  }, []);

  return {
    loader: loading,
    transactions,
    rewards,
  };
}
