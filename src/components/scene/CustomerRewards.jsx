import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../../services/api';
import PropTypes from 'prop-types';
import { calculatePoints, calculateRewards } from '../../utils/index';
import '../../styles.css';
import MonthlyRewards from '../sceneComponents/MonthlyRewards';
import TotalRewards from '../sceneComponents/TotalRewards';
import Transactions from '../sceneComponents/Transactions';
import { useGetTransactionListHook } from '../../hooks/useGetTransactionListHook';

const CustomerRewards = ({ selectedView }) => {
  const { loader, transactions, rewards } = useGetTransactionListHook();

  return loader ? (
    <div className="loader"></div>
  ) : transactions.length ? (
    <div className="content">
      {/* <h1>Retailer Rewards Program</h1> */}
      {selectedView === 'monthly' && <MonthlyRewards rewards={rewards || []} />}
      {selectedView === 'total' && <TotalRewards rewards={rewards || []} />}
      {selectedView === 'transactions' && (
        <Transactions transactions={transactions || []} />
      )}
    </div>
  ) : (
    <div className="no-content">
      <h2>No Data Found</h2>
    </div>
  );
};

CustomerRewards.propTypes = {
  selectedView: PropTypes.string,
};
export default CustomerRewards;
