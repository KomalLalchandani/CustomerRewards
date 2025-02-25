import PropTypes from "prop-types";
import { useState } from "react";
import { sortByRewardPoints } from "../../utils";

/**
 * TotalRewards Component
 * This component is responsible for displaying total rewards list.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.rewards - List to Total Rewards to be displayed.
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
            <tr key={data?.customer_id}>
              <td>{data?.name}</td>
              <td>{data?.total_reward_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TotalRewards.propTypes = {
  totalRewards: PropTypes.array,
};
export default TotalRewards;
