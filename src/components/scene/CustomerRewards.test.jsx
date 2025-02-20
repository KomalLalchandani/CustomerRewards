import { render, screen } from "@testing-library/react";
import CustomerRewards from "../../components/scene/CustomerRewards";
import { useGetTransactionListHook } from "../../hooks/useGetTransactionListHook";
import { describe, test, expect, vi } from "vitest";

vi.mock("../../hooks/useGetTransactionListHook", () => ({
  useGetTransactionListHook: vi.fn(),
}));

describe("CustomerRewards Component", () => {
  test("displays the loader when data is loading", () => {
    useGetTransactionListHook.mockReturnValue({
      loader: true,
      transactions: [],
      rewards: [],
      error: null,
    });

    render(<CustomerRewards selectedView="transactions" />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays error message when API call fails", () => {
    useGetTransactionListHook.mockReturnValue({
      loader: false,
      transactions: [],
      rewards: [],
      error: "Failed to fetch data",
    });

    render(<CustomerRewards selectedView="transactions" />);

    expect(
      screen.getByText(/Error: Failed to fetch data/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Something went wrong while fetching data/i)
    ).toBeInTheDocument();
  });

  test("displays 'No Data Found' when transactions list is empty", () => {
    useGetTransactionListHook.mockReturnValue({
      loader: false,
      transactions: [],
      rewards: [],
      error: null,
    });

    render(<CustomerRewards selectedView="transactions" />);

    expect(screen.getByText(/No Data Found/i)).toBeInTheDocument();
  });

  test("renders MonthlyRewards component when selectedView is 'monthly'", () => {
    useGetTransactionListHook.mockReturnValue({
      loader: false,
      transactions: [{ id: 1, amount: 100 }],
      rewards: [{ customerId: 1, total: 50 }],
      error: null,
    });

    render(<CustomerRewards selectedView="monthly" />);

    expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();
  });

  test("renders TotalRewards component when selectedView is 'total'", () => {
    useGetTransactionListHook.mockReturnValue({
      loader: false,
      transactions: [{ id: 1, amount: 100 }],
      rewards: [{ customerId: 1, total: 50 }],
      error: null,
    });

    render(<CustomerRewards selectedView="total" />);

    expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
  });

  test("renders Transactions component when selectedView is 'transactions'", () => {
    useGetTransactionListHook.mockReturnValue({
      loader: false,
      transactions: [{ transactionId: 1, customer: "John Doe", amount: 100 }],
      rewards: [],
      error: null,
    });

    render(<CustomerRewards selectedView="transactions" />);

    expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
  });
});
