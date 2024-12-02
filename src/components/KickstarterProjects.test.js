import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import KickstarterProjects from './KickstarterProjects';

global.fetch = jest.fn();

describe('KickstarterProjects', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    render(<KickstarterProjects />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API is down'));

    render(<KickstarterProjects />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch projects. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders projects table when fetch succeeds', async () => {
    const mockProjects = [
        { 's.no': 0, 'percentage.funded': 100, 'amt.pledged': 1000 },
        { 's.no': 1, 'percentage.funded': 200, 'amt.pledged': 2000 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProjects),
    });

    render(<KickstarterProjects />);
    
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(3); // Header + 2 rows
    });
  });
});