import { render, screen } from "@testing-library/react";
import MonthlyRewards from "./MonthlyRewards";
import { describe, test, expect } from "vitest";

describe("MonthlyRewards Component", () => {
  test("renders the heading", () => {
    render(<MonthlyRewards rewards={[]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "User Monthly Rewards"
    );
  });

  test("renders table with correct data when loading is false", () => {
    const rewardsData = [
      {
        customerId: "123",
        name: "John Doe",
        monthly: { "January 2024": 50, "December 2023": 40 },
      },
      {
        customerId: "456",
        name: "Jane Doe",
        monthly: { "February 2024": 70 },
      },
    ];

    render(<MonthlyRewards rewards={rewardsData} loading={false} />);

    // Check if table is rendered
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText("Customer ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();

    // Check John Doe's transactions
    expect(screen.getAllByText("123")).toHaveLength(2); // Should appear twice for two months
    expect(screen.getAllByText("John Doe")).toHaveLength(2);
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("December")).toBeInTheDocument();
    expect(screen.getAllByText("2024")).toHaveLength(2);
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("50.00")).toBeInTheDocument();
    expect(screen.getByText("40.00")).toBeInTheDocument();
  });
});
