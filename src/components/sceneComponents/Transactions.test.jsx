import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Transactions from "./Transactions";
import { calculatePoints } from "../../utils";

const mockTransactions = [
  {
    transaction_id: "T001",
    customer: "John Doe",
    date: "2025-02-01",
    product: "Laptop",
    amount: 120.5,
  },
  {
    transaction_id: "T002",
    customer: "Jane Smith",
    date: "2023-11-10",
    product: "Phone",
    amount: 200.0,
  },
  {
    transaction_id: "T003",
    customer: "Alice Johnson",
    date: "2024-12-15",
    product: "Tablet",
    amount: 300.0,
  },
];

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
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return transactions.filter(
      (transaction) => new Date(transaction.date) >= threeMonthsAgo
    );
  }),
}));

describe("Transactions Component", () => {
  test("renders the Transactions component correctly", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText("All Transactions")).toBeInTheDocument();
  });

  test("displays transactions in the table", () => {
    render(<Transactions transactions={mockTransactions} />);

    expect(screen.getByText("T001")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();

    expect(screen.getByText("T002")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });

  test("sorts transactions in ascending and descending order", async () => {
    render(<Transactions transactions={mockTransactions} />);

    const sortButton = screen.getByTestId("sort-button");

    // Default is descending, so the first row should be the latest transaction
    let firstRow = screen.getAllByRole("row")[1]; // Skipping header row
    expect(firstRow).toHaveTextContent("T001"); // Feb 1 (latest)

    // Click to switch to ascending order
    await userEvent.click(sortButton);

    // Wait for the UI to update
    await screen.findByText("T002"); // Ensures UI has updated

    // Get first row again after sorting
    firstRow = screen.getAllByRole("row")[1]; // Skipping header row
    expect(firstRow).toHaveTextContent("T002"); // Nov 10 (earliest)
  });

  test("filters transactions for the last 3 months", () => {
    render(<Transactions transactions={mockTransactions} />);

    const filterDropdown = screen.getByRole("combobox");

    // Change filter to "Last 3 Months"
    fireEvent.change(filterDropdown, { target: { value: "last_3_months" } });

    // Now only recent transactions should be visible (Feb 2025 & Dec 2024)
    expect(screen.getByText("T001")).toBeInTheDocument(); // Feb 2025
    expect(screen.getByText("T003")).toBeInTheDocument(); // Dec 2024

    // Older transaction should be hidden
    expect(screen.queryByText("T002")).not.toBeInTheDocument(); // Nov 2023
  });

  test("displays correct reward points for each transaction", () => {
    render(<Transactions transactions={mockTransactions} />);

    expect(screen.getByText("Reward Points")).toBeInTheDocument();

    expect(
      screen.getByText(calculatePoints(120.5).toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(calculatePoints(200.0).toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(calculatePoints(300.0).toString())
    ).toBeInTheDocument();
  });
});
