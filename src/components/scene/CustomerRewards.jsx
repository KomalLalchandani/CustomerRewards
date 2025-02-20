import PropTypes from "prop-types";
import "../../styles.css";
import MonthlyRewards from "../sceneComponents/MonthlyRewards";
import TotalRewards from "../sceneComponents/TotalRewards";
import Transactions from "../sceneComponents/Transactions";
import { useGetTransactionListHook } from "../../hooks/useGetTransactionListHook";

/**
 * CustomerRewards Component
 * This component is responsible for displaying user monthly rewards, total rewards, and transaction history.
 *
 * @param {Object} props - Component properties
 * @param {string} props.selectedView - The currently selected view ('monthly', 'total', or 'transactions')
 */

const CustomerRewards = ({ selectedView }) => {
  const {
    loader,
    transactions,
    rewards = [],
    error,
  } = useGetTransactionListHook();

  if (loader) {
    return <div className="loader" data-testid="loader"></div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Error: {error}</h2>
        <p>Something went wrong while fetching data. Please try again later.</p>
      </div>
    );
  }

  return transactions.length ? (
    <div className="content">
      {selectedView === "monthly" && <MonthlyRewards rewards={rewards || []} />}
      {selectedView === "total" && <TotalRewards rewards={rewards || []} />}
      {selectedView === "transactions" && (
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
