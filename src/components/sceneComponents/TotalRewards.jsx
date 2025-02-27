import { useState } from "react";
import PropTypes from "prop-types";

import { sortByRewardPoints } from "../../utils";

/**
 * TotalRewards Component
 *
 * This component is responsible for displaying the total rewards list for customers.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.totalRewards - An array of objects where each object represents
 *   the total rewards summary for a customer. Each object must include:
 *   - customerId {string} (required): The unique identifier for the customer.
 *   - name {string} (required): The customer's name.
 *   - totalRewardPoints {number} (required): The total reward points accumulated by the customer.
 */

const TotalRewards = ({ totalRewards = [] }) => {
  const [isAscending, setIsAscending] = useState(false);
  const sortedTotalRewards = sortByRewardPoints(totalRewards, isAscending);

  return (
    <div className="table-container">
      <h3>Total Rewards</h3>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>
              Reward Points
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
          </tr>
        </thead>
        <tbody>
          {sortedTotalRewards.map((data) => (
            <tr key={data.customerId}>
              <td>{data.name}</td>
              <td>{data.totalRewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TotalRewards.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      totalRewardPoints: PropTypes.number.isRequired,
    })
  ),
};
export default TotalRewards;
