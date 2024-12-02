import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectsTable from './ProjectsTable';

describe('ProjectsTable', () => {
  const mockProjects = [
    { 's.no': 0, 'percentage.funded': 100, 'amt.pledged': 1000 },
    { 's.no': 1, 'percentage.funded': 200, 'amt.pledged': 2000 },
  ];

  it('renders table with correct headers', () => {
    render(<ProjectsTable projects={mockProjects} currentPage={1} />);
    
    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount pledged')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    render(<ProjectsTable projects={mockProjects} currentPage={1} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // Header + 2 data rows
  });

  it('displays correct data in rows', () => {
    render(<ProjectsTable projects={mockProjects} currentPage={1} />);
    
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('$1000.00')).toBeInTheDocument();
    expect(screen.getByText('200%')).toBeInTheDocument();
    expect(screen.getByText('$2000.00')).toBeInTheDocument();
  });
});