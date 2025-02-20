import PropTypes from "prop-types";

/**
 * Header Component
 * Displays the navigation menu for switching between different views.
 *
 * @param {Object} props - Component properties
 * @param {Function} props.onSelectView - Function to update the selected view
 * @param {string} props.selectedView - Current selected view
 */

const Header = ({ onSelectView, selectedView }) => {
  return (
    <header className="header">
      <h3>Retailer Rewards Program</h3>
      <nav>
        <ul className="nav-links">
          <li
            className={selectedView === "transactions" ? "active" : ""}
            onClick={() => onSelectView("transactions")}
            data-testid="transaction-btn"
          >
            All Transactions
          </li>
          <li
            className={selectedView === "monthly" ? "active" : ""}
            onClick={() => onSelectView("monthly")}
            data-testid="monthly-rewards-btn"
          >
            User Monthly Rewards
          </li>
          <li
            className={selectedView === "total" ? "active" : ""}
            onClick={() => onSelectView("total")}
            data-testid="total-rewards-btn"
          >
            Total Rewards
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  onSelectView: PropTypes.func,
  selectedView: PropTypes.string,
};
export default Header;
