import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders learn react link with correct attributes', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays initial light theme state', () => {
    render(<App />);
    const themeButton = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeButton).toHaveTextContent(/🌙 Dark/);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  test('toggles theme when button is clicked', () => {
    render(<App />);
    const themeButton = screen.getByRole('button', { name: /switch to dark mode/i });
    
    // Initial state check
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    // Click to toggle to dark theme
    fireEvent.click(themeButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(themeButton).toHaveTextContent(/☀️ Light/);
    expect(themeButton).toHaveAttribute('aria-label', 'Switch to light mode');
    
    // Click to toggle back to light theme
    fireEvent.click(themeButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(themeButton).toHaveTextContent(/🌙 Dark/);
    expect(themeButton).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  test('renders React logo', () => {
    render(<App />);
    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('App-logo');
  });

  test('displays current theme text', () => {
    render(<App />);
    const themeText = screen.getByText(/Current theme:/i);
    expect(themeText).toBeInTheDocument();
    
    const themeValue = screen.getByText('light');
    expect(themeValue).toBeInTheDocument();
    
    // Toggle theme
    const themeButton = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(themeButton);
    
    const updatedThemeValue = screen.getByText('dark');
    expect(updatedThemeValue).toBeInTheDocument();
  });
});
