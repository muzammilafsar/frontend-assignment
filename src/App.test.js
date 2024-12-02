import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table title link', () => {
  render(<App />);
  const titleEle = screen.getByText(/Highly-Rated Kickstarter Projects/i);
  expect(titleEle).toBeInTheDocument();
});
