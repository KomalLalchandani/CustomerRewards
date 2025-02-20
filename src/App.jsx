import { useState } from "react";
import CustomerRewards from "./components/scene/CustomerRewards";
import "./styles.css";
import Header from "./components/common/Header";

/**
 * App Component
 * This is the main component of the application that manages the selected view state
 * and renders the Header and CustomerRewards components accordingly.
 */

const App = () => {
  const [selectedView, setSelectedView] = useState("transactions");

  return (
    <div className="container">
      <Header
        onSelectView={(val) => setSelectedView(val)}
        selectedView={selectedView}
      />
      <CustomerRewards selectedView={selectedView} />
    </div>
  );
};

export default App;
