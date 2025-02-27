import { useState } from "react";
import PropTypes from "prop-types";

import {
  calculatePoints,
  getLastThreeMonthsTransactions,
  sortByDate,
} from "../../utils";

/**
 * Transactions Component
 *
 * This component displays a list of transactions.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.transactions - An array of transaction objects. Each object should have:
 *   - transactionId {string} - A unique identifier for the transaction.
 *   - customer {string} - The customer's name.
 *   - date {string} - The transaction date.
 *   - product {string} - The product purchased.
 *   - amount {number} - The transaction amount.
 */

const options = [
  { name: "All", id: "all" },
  { name: "Last 3 months", id: "last_3_months" },
];

const Transactions = ({ transactions = [] }) => {
  const [isAscending, setIsAscending] = useState(false);
  const [filterOption, setFilterOption] = useState("last_3_months");

  // Filter transactions based on the selected option
  const filteredTransactions =
    filterOption === "last_3_months"
      ? getLastThreeMonthsTransactions(transactions)
      : transactions;

  // Sort transactions
  const sortedTransactions = sortByDate(filteredTransactions, isAscending);

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>All Transactions</h3>

        <select
          name="sort"
          id="sort"
          className="select-option"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          {options.map((dt) => (
            <option key={dt.id} value={dt.id}>
              {dt.name}
            </option>
          ))}
        </select>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Purchase Date
              {isAscending ? (
                <span
                  data-testid="sort-button"
                  onClick={() => setIsAscending(false)}
                  style={{ cursor: "pointer", marginLeft: 20 }}
                >
                  <i className="fa-solid fa-arrow-up-wide-short"></i>
                </span>
              ) : (
                <span
                  data-testid="sort-button"
                  onClick={() => setIsAscending(true)}
                  style={{ cursor: "pointer", marginLeft: 20 }}
                >
                  <i className="fa-solid fa-arrow-down-wide-short"></i>
                </span>
              )}
            </th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((dt) => {
            const points = calculatePoints(dt.amount);
            return (
              <tr key={dt.transactionId}>
                <td>{dt.transactionId}</td>
                <td>{dt.customer}</td>
                <td>{dt.date}</td>
                <td>{dt.product}</td>
                <td>${dt.amount}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default Transactions;
