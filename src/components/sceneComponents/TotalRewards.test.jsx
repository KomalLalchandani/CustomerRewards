import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import TotalRewards from "./TotalRewards";

// Mock sorting function
vi.mock("../../utils", () => ({
  sortByRewardPoints: vi.fn((data, isAscending) => {
    return isAscending
      ? [...data].sort((a, b) => a.totalRewardPoints - b.totalRewardPoints)
      : [...data].sort((a, b) => b.totalRewardPoints - a.totalRewardPoints);
  }),
}));

describe("TotalRewards Component", () => {
  const totalRewardsData = [
    { customerId: "123", name: "John Doe", totalRewardPoints: 120 },
    { customerId: "456", name: "Jane Doe", totalRewardPoints: 80 },
    { customerId: "789", name: "Alice", totalRewardPoints: 150 },
  ];

  test("renders the heading", () => {
    render(<TotalRewards totalRewards={[]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Total Rewards"
    );
  });

  test("renders table with correct data", () => {
    render(<TotalRewards totalRewards={totalRewardsData} />);

    expect(screen.getByRole("table")).toBeInTheDocument();

    // Check headers
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();

    // Check Names
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();

    // Check Reward Points
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("sorts reward points in ascending and descending order", () => {
    render(<TotalRewards totalRewards={totalRewardsData} />);

    const sortButton = screen.getByTestId("sort-button");

    // Default state (Descending) -> Highest reward first
    let firstRow = screen.getAllByRole("row")[1]; // Skipping header row
    expect(firstRow).toHaveTextContent("Alice"); // Highest rewards (150)

    // Click to sort ascending
    fireEvent.click(sortButton);
    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Jane Doe"); // Lowest rewards (80)

    // Click again to sort descending
    fireEvent.click(sortButton);
    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Alice"); // Highest rewards again
  });
});
