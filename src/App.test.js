import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

  /* 적용되었는지에 대한 코드 */
  // const lintTest = screen.getByRole("button", {
  //   name: "lintTest"
  // })
  // expect(lintTest.textContent).toBe('lintTest');
});
