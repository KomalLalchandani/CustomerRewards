import { useState } from "react";
import PropTypes from "prop-types";

import { sortByCustomerId } from "../../utils";

/**
 * MonthlyRewards Component
 * This component is responsible for displaying user monthly rewards list.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.rewards - List of Monthly Rewards to be displayed.
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
              <tr key={data.customer_id + `${data.month + data.year}`}>
                <td>{data.customer_id}</td>
                <td>{data.name}</td>
                <td>{data.month}</td>
                <td>{data.year}</td>
                <td>{data.reward_points}</td>
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
      customer_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      reward_points: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default MonthlyRewards;
