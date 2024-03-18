import { render, screen } from '@testing-library/react';
import Home from '../index';
import { BrowserRouter } from 'react-router-dom';
import RepositoriesContext from '../../../contexts/repositories/context';
import { mockRepositories } from './data';

const mockedUseRepositoriesReturn = {
  repositories: mockRepositories,
  fetchRepositories: jest.fn(() => Promise.resolve(mockRepositories)),
  toggleStarRepository: jest.fn(),
  isFetching: false,
};

jest.mock('../../../contexts/repositories/useRepositories', () =>
  jest.fn(() => mockedUseRepositoriesReturn)
);

describe('Home', () => {
  test('should display repositories', () => {
    const mockRepositoriesContext = {
      repositories: mockRepositories,
      isFetching: false,
      setIsFetching: jest.fn(),
      setRepositories: jest.fn(),
      toggleStarRepository: jest.fn(),
    };

    render(
      <RepositoriesContext.Provider value={mockRepositoriesContext}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </RepositoriesContext.Provider>
    );

    // Check for repositories existence
    [
      screen.getByText('language'),
      screen.getByText('starred'),
      screen.getByText(
        mockRepositoriesContext.repositories[0].stargazers_count.toString()
      ),
      screen.getByText(
        mockRepositoriesContext.repositories[1].stargazers_count.toString()
      ),
      screen.getByText(
        mockRepositoriesContext.repositories[0].forks_count.toString()
      ),
      screen.getByText(
        mockRepositoriesContext.repositories[1].forks_count.toString()
      ),
    ].forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    [
      screen.getAllByText(mockRepositoriesContext.repositories[0].name),
      screen.getAllByText(mockRepositoriesContext.repositories[1].name),
    ].forEach((element) => {
      expect(element).toHaveLength(1);
      expect(element[0]).toBeInTheDocument();
    });

    [
      screen.getAllByText(mockRepositoriesContext.repositories[0].language),
      screen.getAllByText(mockRepositoriesContext.repositories[1].language),
    ].forEach((element) => {
      expect(element).toHaveLength(2);
      expect(element[0]).toBeInTheDocument();
      expect(element[1]).toBeInTheDocument();
    });
  });

  test('should toggle star a repository', () => {
    const mockRepositoriesContext = {
      repositories: mockRepositories,
      isFetching: false,
      setIsFetching: jest.fn(),
      setRepositories: jest.fn(),
      toggleStarRepository: jest.fn(),
    };

    render(
      <RepositoriesContext.Provider value={mockRepositoriesContext}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </RepositoriesContext.Provider>
    );

    const starButton = screen.getAllByRole('button', { name: 'Star' })[0];
    starButton.click();

    // Star repository
    expect(
      mockedUseRepositoriesReturn.toggleStarRepository
    ).toHaveBeenCalledWith(mockRepositoriesContext.repositories[0].id);

    // Unstar repository
    starButton.click();
    expect(
      mockedUseRepositoriesReturn.toggleStarRepository
    ).toHaveBeenCalledWith(mockRepositoriesContext.repositories[0].id);
  });
});
