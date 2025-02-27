import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import Transactions from "./Transactions";
import { calculatePoints } from "../../utils";

// Sample mock transactions data
const mockTransactions = [
  {
    transactionId: "T001",
    customer: "John Doe",
    date: "2025-02-01",
    product: "Laptop",
    amount: 120.5,
  },
  {
    transactionId: "T002",
    customer: "Jane Smith",
    date: "2023-11-10",
    product: "Phone",
    amount: 200.0,
  },
  {
    transactionId: "T003",
    customer: "Alice Johnson",
    date: "2024-12-15",
    product: "Tablet",
    amount: 300.0,
  },
];

// Mock the utilities used by Transactions
vi.mock("../../utils", () => ({
  calculatePoints: vi.fn((amount) => {
    if (amount > 100) return (amount - 100) * 2 + 50;
    if (amount > 50) return amount - 50;
    return 0;
  }),
  sortByDate: vi.fn((data, isAscending) =>
    isAscending
      ? [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
      : [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
  ),
  getLastThreeMonthsTransactions: vi.fn((transactions) => {
    return transactions.filter(
      (transaction) => transaction.transactionId !== "T002"
    );
  }),
}));

describe("Transactions Component", () => {
  test("renders the Transactions component correctly", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText("All Transactions")).toBeInTheDocument();
  });

  test("displays only filtered transactions (default: last 3 months)", () => {
    render(<Transactions transactions={mockTransactions} />);
    // Default filter ("last_3_months") should filter out T002.
    expect(screen.getByText("T001")).toBeInTheDocument();
    expect(screen.getByText("T003")).toBeInTheDocument();
    expect(screen.queryByText("T002")).not.toBeInTheDocument();
  });

  test("sorts transactions in ascending and descending order", async () => {
    render(<Transactions transactions={mockTransactions} />);
    const sortButton = screen.getByTestId("sort-button");

    // Default is descending: first row should show latest T001
    let rows = screen.getAllByRole("row");
    let firstRow = rows[1]; // Skipping header row
    expect(firstRow).toHaveTextContent("T001");

    // Click to sort ascending
    fireEvent.click(sortButton);

    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("T003");

    // Click again to toggle back to descending order
    fireEvent.click(sortButton);
    firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("T001");
  });

  test("displays correct reward points for each transaction", () => {
    render(<Transactions transactions={mockTransactions} />);

    expect(
      screen.getByText(calculatePoints(120.5).toString())
    ).toBeInTheDocument();

    expect(
      screen.getByText(calculatePoints(300.0).toString())
    ).toBeInTheDocument();
  });
});
