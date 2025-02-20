import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App"; // Adjust path based on your file structure
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";

describe("App Component", () => {
  test("renders App component with Header and CustomerRewards", () => {
    render(<App />);

    // Check if Header is present
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Assuming Header has a <header> element

    // Check if default view 'Transactions' is rendered
    expect(screen.getByText("All Transactions")).toBeInTheDocument();
  });

  test("changes selected view when Header option is clicked", () => {
    render(<App />);

    // Mock buttons in Header (assuming Header has buttons with 'data-testid')
    const totalRewardsButton = screen.getByTestId("total-rewards-btn");
    const monthlyRewardsButton = screen.getByTestId("monthly-rewards-btn");

    // Click to change view to Total Rewards
    fireEvent.click(totalRewardsButton);
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();

    // Click to change view to Monthly Rewards
    fireEvent.click(monthlyRewardsButton);
    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();
  });
});
