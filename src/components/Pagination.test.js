import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockPaginate = jest.fn();

  it('renders correct number of page buttons', () => {
    render(
      <Pagination
        projectsPerPage={5}
        totalProjects={25}
        paginate={mockPaginate}
        currentPage={1}
      />
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5); // 25 total / 5 per page = 5 pages
  });

  it('calls paginate function with correct page number when a button is clicked', () => {
    render(
      <Pagination
        projectsPerPage={5}
        totalProjects={25}
        paginate={mockPaginate}
        currentPage={1}
      />
    );
    
    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);
    
    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  it('highlights the current page button', () => {
    render(
      <Pagination
        projectsPerPage={5}
        totalProjects={25}
        paginate={mockPaginate}
        currentPage={3}
      />
    );
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton.parentElement).toHaveClass('active');
  });
});