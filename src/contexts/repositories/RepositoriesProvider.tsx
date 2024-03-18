import { ReactNode, useState } from 'react';
import RepositoriesContext from './context';
import { Repository } from '../../models';

const RepositoriesProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [repositories, setRepositories] = useState([] as Repository[]);

  return (
    <RepositoriesContext.Provider
      value={{
        isFetching,
        setIsFetching,
        repositories: repositories,
        setRepositories: setRepositories,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
};

export default RepositoriesProvider;
