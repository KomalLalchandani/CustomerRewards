import PropTypes from "prop-types";

const TotalRewards = ({ rewards = [] }) => (
  <div className="table-container">
    <h3>Total Rewards</h3>

    <table className="styled-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {rewards.map((data) => (
          <tr key={data?.customerId}>
            <td>{data?.name}</td>
            <td>{data?.total?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TotalRewards.propTypes = {
  rewards: PropTypes.array,
};
export default TotalRewards;
