import { useState } from "react";
import PropTypes from "prop-types";

import { sortByCustomerId } from "../../utils";

/**
 * MonthlyRewards Component
 *
 * This component is responsible for displaying the monthly rewards list for customers.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.monthlyRewards - An array of objects where each object represents
 *   the rewards summary for a customer for a specific month. Each object must include:
 *   - customerId {string} (required): The unique identifier for the customer.
 *   - name {string} (required): The customer's name.
 *   - month {string} (required): The month for which rewards are aggregated.
 *   - year {string|number} (required): The year corresponding to the rewards.
 *   - rewardPoints {number} (required): The reward points accumulated for that month.
 */

const MonthlyRewards = ({ monthlyRewards = [] }) => {
  const [sortState, setSortState] = useState("default");
  const sortedMonthlyRewards = sortByCustomerId(monthlyRewards, sortState);

  return (
    <div className="table-container">
      <h3>User Monthly Rewards</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>
              Customer ID
              {sortState === "default" ? (
                <span
                  data-testid="sort-button"
                  onClick={() => setSortState("asc")}
                  style={{ cursor: "pointer", marginLeft: 20 }}
                >
                  <i className="fa-solid fa-sort"></i>
                </span>
              ) : sortState === "asc" ? (
                <span
                  data-testid="sort-button"
                  onClick={() => setSortState("desc")}
                  style={{ cursor: "pointer", marginLeft: 20 }}
                >
                  <i className="fa-solid fa-sort-up"></i>
                </span>
              ) : (
                <span
                  data-testid="sort-button"
                  onClick={() => setSortState("default")}
                  style={{ cursor: "pointer", marginLeft: 20 }}
                >
                  <i className="fa-solid fa-sort-down"></i>
                </span>
              )}
            </th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedMonthlyRewards.map((data) => {
            return (
              <tr key={data.customerId + `${data.month + data.year}`}>
                <td>{data.customerId}</td>
                <td>{data.name}</td>
                <td>{data.month}</td>
                <td>{data.year}</td>
                <td>{data.rewardPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

MonthlyRewards.propTypes = {
  monthlyRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default MonthlyRewards;
