import PropTypes from "prop-types";

const Header = ({ onSelectView, selectedView }) => {
  return (
    <header className="header">
      <h3>Retailer Rewards Program</h3>
      <nav>
        <ul className="nav-links">
          <li
            className={selectedView === "transactions" ? "active" : ""}
            onClick={() => onSelectView("transactions")}
          >
            All Transactions
          </li>
          <li
            className={selectedView === "monthly" ? "active" : ""}
            onClick={() => onSelectView("monthly")}
          >
            User Monthly Rewards
          </li>
          <li
            className={selectedView === "total" ? "active" : ""}
            onClick={() => onSelectView("total")}
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
