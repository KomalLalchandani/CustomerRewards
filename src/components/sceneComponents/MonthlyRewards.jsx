const MonthlyRewards = ({ rewards = [] }) => (
  <div className="table-container">
    <h3>User Monthly Rewards</h3>
    <table className="styled-table">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Month</th>
          <th>Year</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {rewards
          ?.sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((data) =>
            Object.entries(data.monthly).map(([monthYear, points]) => {
              const [month, year] = monthYear.split(' ');
              return (
                <tr key={data?.customerId + monthYear}>
                  <td>{data?.customerId}</td>
                  <td>{data?.name}</td>
                  <td>{month}</td>
                  <td>{year}</td>
                  <td>{points.toFixed(2)}</td>
                </tr>
              );
            })
          )}
      </tbody>
    </table>
  </div>
);

export default MonthlyRewards;
