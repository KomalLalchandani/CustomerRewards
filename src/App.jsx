import { useState, useCallback } from "react";

import "./styles.css";

import CustomerRewards from "./components/scene/CustomerRewards";
import Header from "./components/common/Header";

/**
 * App Component
 * This is the main component of the application that manages the selected view state
 * and renders the Header and CustomerRewards components accordingly.
 */

const App = () => {
  const [selectedView, setSelectedView] = useState("transactions");

  const onChangeSelectedView = useCallback((view) => {
    setSelectedView(view);
  }, []);

  return (
    <div className="container">
      <Header
        onSelectView={(val) => onChangeSelectedView(val)}
        selectedView={selectedView}
      />
      <CustomerRewards selectedView={selectedView} />
    </div>
  );
};

export default App;
