import { render, screen } from '@testing-library/react';
import TotalRewards from './TotalRewards';

describe('TotalRewards Component', () => {
  test('renders the TotalRewards component with table headers', () => {
    render(<TotalRewards rewards={[]} />);

    expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();
  });

  test('displays customer names and reward points correctly', () => {
    const rewards = [
      { customerId: 1, name: 'John Doe', total: 150 },
      { customerId: 2, name: 'Jane Smith', total: 200 },
    ];

    render(<TotalRewards rewards={rewards} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('150.00')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('200.00')).toBeInTheDocument();
  });

  test('renders correctly when rewards list is empty', () => {
    render(<TotalRewards rewards={[]} />);

    // Ensure the table exists but has no rows apart from headers
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(1); // Only header row should exist
  });
});
