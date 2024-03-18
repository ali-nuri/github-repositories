import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RepositoriesProvider from '../RepositoriesProvider';
import RepositoriesContext from '../context';

describe('RepositoriesProvider', () => {
  it('renders children without crashing', () => {
    render(
      <RepositoriesProvider>
        <div>Child component</div>
      </RepositoriesProvider>
    );

    const childComponent = screen.getByText('Child component');
    expect(childComponent).toBeInTheDocument();
  });

  it('sets the initial state of repositories', () => {
    render(
      <RepositoriesProvider>
        <RepositoriesContext.Consumer>
          {({ repositories }) => (
            <div data-testid="repositories-length">{repositories.length}</div>
          )}
        </RepositoriesContext.Consumer>
      </RepositoriesProvider>
    );

    const repositoriesLength = screen.getByTestId('repositories-length');
    expect(repositoriesLength).toHaveTextContent('0');
  });
});
