import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Header from "./Header";

test("renders Header component correctly", () => {
  render(<Header onSelectView={() => {}} selectedView="transactions" />);
  expect(screen.getByText(/Retailer Rewards Program/i)).toBeInTheDocument();
  expect(screen.getByText(/All Transactions/i)).toBeInTheDocument();
  expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
});

test("clicking on navigation updates the selected view", () => {
  const mockSelectView = vi.fn();
  render(<Header onSelectView={mockSelectView} selectedView="transactions" />);

  fireEvent.click(screen.getByText(/User Monthly Rewards/i));
  expect(mockSelectView).toHaveBeenCalledWith("monthly");
});
