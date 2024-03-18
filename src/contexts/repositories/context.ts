import { createContext } from 'react';
import { Repository } from '../../models';

export interface RepositoriesContextInterface {
  isFetching: boolean;
  setIsFetching(state: boolean): void;
  repositories: Repository[];
  setRepositories(repositories: Repository[]): void;
}

export const initialRepositoriesContext: RepositoriesContextInterface = {
  isFetching: false,
  setIsFetching: () => undefined,
  setRepositories: () => undefined,
  repositories: [],
};
const RepositoriesContext = createContext(initialRepositoriesContext);

export default RepositoriesContext;
