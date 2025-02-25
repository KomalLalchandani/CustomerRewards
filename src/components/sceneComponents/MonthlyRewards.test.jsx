import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import MonthlyRewards from "./MonthlyRewards";

// Mock sorting function
vi.mock("../../utils", () => ({
  sortByCustomerId: vi.fn((data, sortState) => {
    if (sortState === "asc")
      return [...data].sort((a, b) => a.customer_id - b.customer_id);
    if (sortState === "desc")
      return [...data].sort((a, b) => b.customer_id - a.customer_id);
    return data; // Default (unsorted)
  }),
}));

describe("MonthlyRewards Component", () => {
  const rewardsData = [
    {
      customer_id: "123",
      name: "John Doe",
      month: "January",
      year: "2024",
      reward_points: 60,
    },
    {
      customer_id: "123",
      name: "John Doe",
      month: "December",
      year: "2023",
      reward_points: 40,
    },
    {
      customer_id: "456",
      name: "Jane Doe",
      month: "February",
      year: "2024",
      reward_points: 70,
    },
  ];

  test("renders the heading", () => {
    render(<MonthlyRewards monthlyRewards={[]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "User Monthly Rewards"
    );
  });

  test("renders table with correct data", () => {
    render(<MonthlyRewards monthlyRewards={rewardsData} />);

    screen.debug(); // Log the output to inspect if needed

    expect(screen.getByRole("table")).toBeInTheDocument();

    // Check headers
    expect(screen.getByText("Customer ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();

    // Check Customer IDs
    expect(screen.getAllByText("123")).toHaveLength(2);
    expect(screen.getByText("456")).toBeInTheDocument();

    // Check Names
    expect(screen.getAllByText("John Doe")).toHaveLength(2);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();

    // Check Dates
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("December")).toBeInTheDocument();
    expect(screen.getByText("February")).toBeInTheDocument();

    // Check Reward Points
    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
  });

  test("sorts transactions in ascending and descending order", () => {
    render(<MonthlyRewards monthlyRewards={rewardsData} />);

    const sortButton = screen.getByTestId("sort-button");

    // Default state (unsorted)
    let firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("123"); // Assume it's first by default

    // Click to sort ascending
    fireEvent.click(sortButton);
    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("123"); // Smallest ID first

    // Click again to sort descending
    fireEvent.click(sortButton);
    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("456"); // Largest ID first

    // Click again to reset sorting
    fireEvent.click(sortButton);
    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("123"); // Back to default
  });
});
