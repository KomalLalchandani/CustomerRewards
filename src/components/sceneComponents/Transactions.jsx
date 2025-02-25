import { useState } from "react";
import PropTypes from "prop-types";
import {
  calculatePoints,
  getLastThreeMonthsTransactions,
  sortByDate,
} from "../../utils";

/**
 * Transactions Component
 * This component is responsible for displaying all transaction list.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.transactions - List of transactions to be displayed.
 */

const options = [
  { name: "All", id: "all" },
  { name: "Last 3 months", id: "last_3_months" },
];

const Transactions = ({ transactions = [] }) => {
  const [isAscending, setIsAscending] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

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
            const points = calculatePoints(dt?.amount);
            return (
              <tr key={dt?.transaction_id}>
                <td>{dt?.transaction_id}</td>
                <td>{dt?.customer}</td>
                <td>{dt?.date}</td>
                <td>{dt?.product}</td>
                <td>${dt?.amount}</td>
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
  transactions: PropTypes.array,
};
export default Transactions;
